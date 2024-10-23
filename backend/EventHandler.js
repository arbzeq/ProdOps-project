import { EventEmitter } from 'events';

export const eventHandler = new EventEmitter();

export let state = {
  enoughArticles: false,
  forkliftStatus: "idle"
};

// Example of emitting an event in the server setup
eventHandler.on('serverStarted', (data) => {
  console.log(`The server has started successfully ${data}!`);
});

// Example of emitting an event in the server setup
eventHandler.emit('serverStarted', "message");



// Example of emitting an event in the server setup
eventHandler.on('orderedArticles', async (pool) => {
  //console.log("Inside eventhandler orderedArticles");
  let getArticles = await pool.query("SELECT * FROM articles;");
  let articleACount = getArticles.rows[0].article_count;
  let articleBCount = getArticles.rows[1].article_count;

  if(articleACount >= 3 && articleBCount >= 2){
    state.enoughArticles = true;
    eventHandler.emit("readyForTransport", pool);
  }

});


// Example of emitting an event in the server setup
eventHandler.on('readyForTransport', async (pool) => {
  console.log("Getting to the storage, please wait.");
  state.forkliftStatus = "to_storage";
  let counter = 0;
  const timer =  setTimeout(() => {
    
    console.log("Picking the articles!.");
    state.forkliftStatus = "picking";
    setTimeout(() => {
      console.log("Got the articles!");
      state.forkliftStatus = "to_production";
      setTimeout(() => {
        console.log("Sending articles to production!");
        state.forkliftStatus = "idle";
      }, 3000)
    }, 3000);
  }, 3000);

  let removeArticlesQuery = `
                UPDATE articles
                  SET article_count = CASE
                    WHEN article_name = 'ARTICLE_A' THEN article_count - 3
                    WHEN article_name = 'ARTICLE_B' THEN article_count - 2
                  END
                RETURNING *;
  `;
  let getArticles = await pool.query(removeArticlesQuery);
  console.log(`We now have these articles ${getArticles.rows}`);
  state.enoughArticles = false;
  
});
