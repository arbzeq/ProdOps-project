import { ReactNode, useEffect, useState } from "react";
import { getStatus } from "../api";
import "../css/DashboardPage.css";
import idleIcon from "../assets/idle.png";
import toStorageIcon from "../assets/to_storage.png";
import pickingIcon from "../assets/picking.png";
import toProductionIcon from "../assets/to_production.jpg";


interface IResponse {
  enoughArticles: boolean;
  forkliftStatus: string;
  ARTICLEA: number;
  ARTICLEB: number;
}
export function DashboardPage() : ReactNode {
  
  const [enoughArticlesString, setEnoughArticlesString] = useState<string>("not_enough");
  const [forkliftStatus, setForkliftStatus] = useState<string>("idle");
  const [articleACount, setArticleACount] = useState<number>(0);
  const [articleBCount, setArticleBCount] = useState<number>(0);

  const [forkliftIcon, setForkliftIcon] = useState<string>("");

  useEffect(() => {
    const interval = setInterval( async () => {

      try {
        const response = await getStatus();
        console.log(response);
        if(response.enoughArticles){
          setEnoughArticlesString("enough");
        }else{
          setEnoughArticlesString("not_enough");
        }
        
        setForkliftStatus(response.forkliftStatus);
        
       
        setArticleACount(response.ARTICLEA);
        setArticleBCount(response.ARTICLEB);

        


      } catch(error){
        console.log(error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if(forkliftStatus == "idle") setForkliftIcon(idleIcon);
    if(forkliftStatus == "to_storage") setForkliftIcon(toStorageIcon);
    if(forkliftStatus == "picking") setForkliftIcon(pickingIcon);
    if(forkliftStatus == "to_production") setForkliftIcon(toProductionIcon);
    console.log(enoughArticlesString);
    console.log(forkliftStatus);
    console.log(articleACount);
    console.log(articleBCount);
    console.log(forkliftIcon);
  }, [forkliftStatus])

  return (
    <div className="dashboardPage">
      <h1>This is the dashboard page.</h1>
      <section className={`storage ${enoughArticlesString}`}>
        <div className="articleContainer">
          <h3>Article A</h3>
          <h3>{articleACount}</h3>
        </div>
        <div className="articleContainer">
          <h3>Article B</h3>
          <h3>{articleBCount}</h3>
        </div>
      </section>


      <figure>
        <h3>{forkliftStatus}</h3>
        <img src={forkliftIcon}></img>
      </figure>
    </div>
  );
}