#!/bin/bash
#this file is used in the principal mongod to create entries 
mongo <<EOF
var config = {
    "_id": "database_replica_set",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongo_1:27017",
            "priority": 9
        },
        {
            "_id": 2,
            "host": "mongo_2:27017",
            "priority": 8
        },
        {
            "_id": 3,
            "host": "mongo_3:27017",
            "priority": 7
        },
	{
            "_id" : 21,
            "host" : "mongo_arb_1:27017",
            "arbiterOnly" : true
	},
	{
            "_id" : 22,
            "host" : "mongo_arb_2:27017",
            "arbiterOnly" : true
	}
    ]
};
rs.initiate(config, { force: true });
rs.status();
EOF
