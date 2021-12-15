const mongoose = require('mongoose'),
    Events = mongoose.model('Event'),
    Door = mongoose.model('Door'),
    Tag = mongoose.model('Tag'),
    Tenant = mongoose.model('Tenant')


// Create event
exports.create_an_event = (req, res) => {
    let new_event = new Events(req.body);
    if(new_event.date === null)
    {
        new_event.date = Date.now();
    }
    if(new_event.tag.access.includes(new_event.door.ObjectId))
    {
        new_event.save((err, event) => {
            if (err)
                res.send(`error: ${err}`);
            res.json(event);
        });
    }
    else
    {
        new_event.in = false;
        new_event.out = false;
        new_event.error = 'Unauthorized'
        new_event.save((err, event) => {
            if (err)
                res.send(`error: ${err}`);
            res.json(event);
        });
    }
};

// Get all events
exports.get_all_events = (req, res) => {
    Events.find({}, (err, event) => {
        if (err)
            res.send(`error: ${err}`);
        res.json(event);
    });
};

// Get an event by id
exports.get_an_event = (req, res) => {
    Events.findById(req.params.eventId, (err, event) => {
        if (err)
            res.send(`error: ${err}`);
        res.json(event);
    });
};

// Update an event
exports.update_an_event = (req, res) => {
    Events.findByIdAndUpdate(req.params.eventId, req.body, {new: true}, (err, updated_event) => {
        if (err)
            res.send(`error: ${err}`);
        res.json(updated_event);
    });
};

// Delete an event
exports.delete_an_event = (req, res) => {
    Events.findByIdAndDelete(req.params.eventId, (err, deleted_event) => {
        if (err)
            res.send(`error: ${err}`);
        res.json({message: `event: - ${deleted_event} - has successfully been deleted.`})
    })
};

// Handels the api calls from the Admin regarding the events. 

exports.FindEntriesByDoor = (req, res) => { 
    let maxE = parseInt(req.params.maxEntries);
    
    if(isNaN(req.params.maxEntries))
    {
       maxE = 20; 
    }
    let door = Door.find( {'door.doorName': req.params.doorName } );
    Events.find( {'door': door.ObjectId} , (err, event) => {
        if(err)
        res.send(err);
    res.json(event);
    }).limit(maxE)
};

exports.FindEntriesByEvent = (req, res) => {
    let maxE = parseInt(req.params.maxEntries);
    
    if(isNaN(req.params.maxEntries))
    {
       maxE = 20; 
    }
    else if(req.params.eventName === "IN")
    {
        Events.find({ in: true }, (err, event) => {
            if(err)
            res.send(err);
        res.json(event);
        }).limit(maxE)
    }
    else if(req.params.eventName === "UT")
    {
        Events.find({ out: true }, (err, event) => {
            if(err)
            res.send(err);
        res.json(event);
        }).limit(maxE)
    }
    else if(req.params.eventName === "ERROR")
    {
        Events.find({ error: "Unauthorized" }, (err, event) => {
            if(err)
            res.send(err);
        res.json(event);
        }).limit(maxE)
    }
};

exports.FindEntriesByLocation = (req, res) => {
    let maxE = parseInt(req.params.maxEntries);
    
    if(isNaN(req.params.maxEntries))
    {
       maxE = 20; 
    }
    let door = Door.find( {'door.location': req.params.location } );
    Events.find( {'door': door.ObjectId} , (err, event) => {
        if(err)
        res.send(err);
    res.json(event);
    }).limit(maxE)
};

exports.FindEntriesByTag = (req, res) => {
    let maxE = parseInt(req.params.maxEntries);
    
    if(isNaN(req.params.maxEntries))
    {
       maxE = 20; 
    }
    let tag = Tag.find( {'tag.tagNumber': req.params.tagNumber } );
    Events.find( {'tag': tag.ObjectId} , (err, event) => {
        if(err)
        res.send(err);
    res.json(event);
    }).limit(maxE)
};

exports.FindEntriesByTenant = (req, res) => {
    let maxE = parseInt(req.params.maxEntries);
    
    if(isNaN(req.params.maxEntries))
    {
       maxE = 20; 
    }
    let tenant = Tenant.findOne( {'tenantName': req.params.tenantName } );
    let tag = Tag.findOne({'tenant': tenant.ObjectId});
    Events.find( {'tag': tag.ObjectId} , (err, event) => {
        if(err)
        res.send(err);
    res.json(event);
    }).limit(maxE)
};

exports.ListTenantsAt = (req, res) => {
    let maxE = parseInt(req.params.maxEntries);
    
    if(isNaN(req.params.maxEntries))
    {
       maxE = 20; 
    }
    Tenant.find( {'appartment': req.params.appartment } , (err, event) => {
        if(err)
        res.send(err);
    res.json(event.tenant);
    }).limit(maxE)
};