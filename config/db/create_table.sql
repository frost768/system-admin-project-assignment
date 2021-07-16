CREATE TABLE IF NOT EXISTS site_log (
    id INT NOT NULL AUTO_INCREMENT,
    timestamp DATETIME,
    ip_addr VARCHAR(20),
    PRIMARY KEY ( id )
);