RESTAURANT 
```yaml
Pending - email validation or SMS confirmation (Twilio OTP auth)

-- Basic Information (Zomato signup page)
    -- name
    -- address
    -- ratings
    -- contact email
    -- contact name 
    -- contact phone 
    -- delivery_ratings
    -- open time 
    -- close time
    -- lat long 
    -- tags

-- Menu
    -- type
    -- rest. id 
    -- menu_type (reserved for customer visit time so we can decide what menu to show)
    -- gallery_image (mediumText for storing the uploaded restaurant menu)
    -- rating (set by the customer)

-- Dishes
    -- Id
    -- Rest. ID
    -- Name 
    -- Tags (Text)
    -- Price
    -- availability_time
    -- description
    -- image
    -- rating
```