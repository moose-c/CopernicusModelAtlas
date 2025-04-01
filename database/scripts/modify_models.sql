ALTER TABLE models
  ALTER COLUMN boxFile7 TYPE OID USING boxFile7::OID;


INSERT INTO moderators (moderator_ids, moderator_email) VALUES (ARRAY['f78916723e99f74685cdf78916723e99', 'auth0|674077c5770f0139bf2992e5'], 'mooscastelijn@gmail.com');

SELECT * FROM moderators