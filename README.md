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

=== Players points contribution ===

```db.getCollection("players").aggregate([
    {$unwind: '$games'},
    {
        $project: {
            name: 1,
            squad_number: 1,
            points: {
                $sum: "$games.points_swing"
            }
        }
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        squad_number: { $first: "$squad_number" },
        points: { $sum: "$points" }
      }
    },
    {
        $sort: { points: -1 }
    }
])```

=== Players points contribution ===

Trying to include the number of games played, but there might be a problem with the games array not being defined properly as they're all null

```db.getCollection("players").aggregate([
    {$unwind: '$games'},
    {
        $project: {
            name: 1,
            squad_number: 1,
            points: "$games.points_swing"
        }
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        squad_number: { $first: "$squad_number" },
        points: { $sum: "$points" },
        total: { $sum: { $size: { "$ifNull": [ [], "$games" ] } } }
      }
    },
    {
        $sort: { points: -1 }
    }
])
```


== Notes ==

The Crawley match, players have been set -2 points for the defeat, but Tranmere is -1.