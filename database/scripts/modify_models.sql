-- Start by dropping the old columns
ALTER TABLE models
    DROP COLUMN IF EXISTS boxfile0,
    DROP COLUMN IF EXISTS boxfile1,
    DROP COLUMN IF EXISTS boxfile2,
    DROP COLUMN IF EXISTS boxfile3,
    DROP COLUMN IF EXISTS methodsfile;

-- Now add the new columns with OID type
ALTER TABLE models
    ADD COLUMN boxfile0 OID,
    ADD COLUMN boxfile1 OID,
    ADD COLUMN boxfile2 OID,
    ADD COLUMN boxfile3 OID,
    ADD COLUMN methodsfile OID;
