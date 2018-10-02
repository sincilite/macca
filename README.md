== Example Queries ==

=== Find players involved in a win ===

```db.getCollection("players").find(
{ games: { $elemMatch: { result: "W", completed_minutes : { $gt: 0 } } } }, { _id: 0, name: 1, "games.opposition": 1, "games.result": 1 } )```

=== Find players who played in a defeat and only result those games.  Colums returned are defined within $project ===

```db.getCollection("players").aggregate([
    { $match: {'games.result': "L"} },
        //Filter the items array
    {
        $addFields: {
            'games': {
                $filter: {
                    input: '$games', as: 'game', cond: {
                        $and: [
                            {$eq: ["$$game.result", "L"]},
                            {$gt: ["$$game.completed_minutes", 0]}
                        ]
                    }
                }
            }
        }
    },
    {
        $project: { name: 1, "games.opposition": 1 }
    }

]);```
