# Jenca

## API Docs

### Users

#### Register
**Url**: /api/users/ (POST)

Params:
- `name`
- `email`
- `password`

### Digital Ocean

#### Create droplet

**Url**: /api/droplets (POST)

- `name`
- `region`
- `size`

#### Get all regions

**Url**: /api/droplets/regions (GET)