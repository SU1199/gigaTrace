-- set timezone='Asia/Kolkata';

drop table log;
create table log(
    FROM_NO text,
    TO_NO text,
    TS timestamptz,
    DURATION numeric,
    C1_ID text,
    C2_ID text,
    TYPE text,
    IMEI text,
    IMSI text,
    ROAMING text,
    LAST_UPDATE timestamptz
);

drop table tower;

create table tower(
  TOWER_ID text,
  LATITUDE numeric,
  LONGITUDE numeric,
  LAT_LANG text,
  LOCATION text,
  RADIUS text
);


create
or
replace
  function nearestTower(lat numeric, lng numeric) returns
table
  (t_id text, loc text, dist double precision) language plpgsql as $$begin
return
  query
SELECT
  tower_id,
  location,
  distance
FROM
  (
    SELECT
      tower_id,
      location,(
        (
          ACOS(
            SIN(lat * PI() / 180) * SIN(u.latitude * PI() / 180) + COS(lat * PI() / 180) * COS(u.latitude * PI() / 180) * COS((lng - u.longitude) * PI() / 180)
          ) * 180 / PI()
        ) * 60 * 1.1515
      ) as distance
    FROM
      tower u
  ) d
WHERE
  distance <= 5
ORDER BY
  distance ASC;

END;

$$

-- select * from nearestTower(29.853961012044852, 77.91176382319837) limit 1;
