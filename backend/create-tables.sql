CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    property text,
    latitude double precision,
    longitude double precision,
    city text,
    country text,
    monthly_rate integer,
    lease_term_months integer,
    total_views integer
);

CREATE UNIQUE INDEX properties_pkey ON properties(id int4_ops);
CREATE INDEX properties_city_idx ON properties(city text_ops);
CREATE INDEX properties_country_idx ON properties(country text_ops);