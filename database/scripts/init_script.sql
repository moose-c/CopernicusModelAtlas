CREATE TABLE models (
  id SERIAL PRIMARY KEY, 
  model_name TEXT NOT NULL,
  keywords TEXT,
  modeller_name TEXT,
  modeller_url TEXT,
  icon TEXT,
  descr TEXT,
  explanation_figure TEXT,
  button_text TEXT,
  button_url TEXT
);
