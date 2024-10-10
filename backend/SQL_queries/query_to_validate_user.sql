WITH validate_user AS (
	SELECT
		username,
		CASE
			WHEN password = 'b' THEN 'correct_password'
			ELSE 'incorrect_password'
		END AS password_status
	FROM USERS
	WHERE username = 'd'
)
SELECT 
	CASE 
		WHEN (SELECT COUNT(*) FROM validate_user) = 0 THEN 'user_not_found'
		ELSE (SELECT password_status FROM validate_user)
	END AS "result";
