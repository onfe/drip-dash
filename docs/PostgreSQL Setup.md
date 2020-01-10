# PostgreSQL Local Setup

If you're using PostgreSQL on the same machine as DripDash, here's how to get it installed and configured:

```bash
# First, install PostgreSQL using your package manager. For example:
sudo apt-get install postgresql

# Create the user 'dripdash'.
sudo -u postgres createuser dripdash

# Create the database 'dripdash'.
sudo -u postgres createdb dripdash

# Login to psql as postgres.
sudo -u postgres psql
```

Now, within the PostgreSQL prompt:

```sql
-- Grant 'dripdash' permission to edit the 'dripdash' db.
GRANT ALL PRIVILEGES ON DATABASE dripdash TO dripdash;

-- Change the password, here we'll assume you set it to password.
\password dripdash

-- Exit the prompt.
\q
```

Just to be safe it's a good idea to restart the `postgresql` service: `sudo service postgresql restart`.

## `.env` configuration

If you've setup PostgreSQL locally as shown above, your `.env` will look like this:

```
DATABASE_URL=postgresql://dripdash:password@localhost:5432/dripdash
```

