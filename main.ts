function selectNextEnemyInScreen () {
    i = (currentSelectedEnemyIndex + 1) % patrolSprites.length
    while (i != currentSelectedEnemyIndex) {
        // not relative to camera, so passing null is ok
        if (!(patrolSprites[i].isOutOfScreen(game.currentScene().camera))) {
            currentSelectedEnemySprite = patrolSprites[i]
            currentSelectedEnemyIndex = i
            break;
        }
        i = (i + 1) % patrolSprites.length
    }
    if (enemyCursor == null) {
        enemyCursor = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 1 1 1 1 . . . . . . 
            . . . . . . 1 2 2 1 . . . . . . 
            . . . . . . 1 2 2 1 . . . . . . 
            . . . . . . 1 2 2 1 . . . . . . 
            . . . . . . 1 2 2 1 . . . . . . 
            . . . . . . 1 2 2 1 . . . . . . 
            . . . . . . 1 2 2 1 . . . . . . 
            . . . . . . 1 2 2 1 . . . . . . 
            . . . . . . 1 2 2 1 . . . . . . 
            . . . 1 1 1 1 2 2 1 1 1 1 . . . 
            . . . . 1 2 2 2 2 2 2 1 . . . . 
            . . . . . 1 2 2 2 2 1 . . . . . 
            . . . . . . 1 2 2 1 . . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, 0)
        enemyCursor.z = scene.HUD_Z
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (tiles.tileIs(tiles.locationInDirection(tiles.locationOfSprite(playerSprite), CollisionDirection.Top), sprites.dungeon.greenSwitchUp)) {
        music.baDing.play()
        tiles.setTileAt(tiles.getTileLocation(12, 8), sprites.dungeon.greenSwitchDown)
        tiles.setTileAt(tiles.getTileLocation(14, 11), sprites.dungeon.floorLight2)
        tiles.setWallAt(tiles.getTileLocation(14, 11), false)
    } else {
        if (hiding) {
            hiding = false
            controller.moveSprite(playerSprite)
            playerSprite.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . b 5 5 b . . . 
                . . . . . . b b b b b b . . . . 
                . . . . . b b 5 5 5 5 5 b . . . 
                . b b b b b 5 5 5 5 5 5 5 b . . 
                . b d 5 b 5 5 5 5 5 5 5 5 b . . 
                . . b 5 5 b 5 d 1 f 5 d 4 f . . 
                . . b d 5 5 b 1 f f 5 4 4 c . . 
                b b d b 5 5 5 d f b 4 4 4 4 b . 
                b d d c d 5 5 b 5 4 4 4 4 4 4 b 
                c d d d c c b 5 5 5 5 5 5 5 b . 
                c b d d d d d 5 5 5 5 5 5 5 b . 
                . c d d d d d d 5 5 5 5 5 d b . 
                . . c b d d d d d 5 5 5 b b . . 
                . . . c c c c c c c c b b . . . 
                `)
        } else {
            hiding = true
            controller.moveSprite(playerSprite, 0, 0)
            playerSprite.setImage(img`
                e 3 3 3 3 3 3 3 3 3 3 3 3 3 3 e 
                e 4 4 4 4 4 4 4 4 4 4 4 4 4 4 e 
                e e e e e e e e e e e e e e e e 
                e 4 e 4 4 4 4 4 4 4 4 4 4 e 4 e 
                e 4 e e e e e e e e e e e e 4 e 
                e 4 e 3 3 3 3 3 3 3 3 3 3 e 4 e 
                e 4 e 4 4 4 4 4 4 4 4 4 4 e 4 e 
                e 4 e e e e e e e e e e e e 4 e 
                e 4 e 3 3 3 3 3 3 3 3 3 3 e 4 e 
                e 4 e 4 4 4 4 4 4 4 4 4 4 e 4 e 
                e 3 3 3 3 3 3 3 3 3 3 3 3 3 3 e 
                e 4 4 4 4 4 4 4 4 4 4 4 4 4 4 e 
                e e e e e e e e e e e e e e e e 
                e e c c c c c c c c c c c c e e 
                e e c c c c c c c c c c c c e e 
                e e e e e e e e e e e e e e e e 
                `)
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    game.over(true)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    selectNextEnemyInScreen()
    toggleAlertRange(currentSelectedEnemySprite)
})
function toggleAlertRange (sprite: Sprite) {
    if (alertRange == null) {
        alertRange = shader.createImageShaderSprite(img`
            ........................222222222222222.........................
            ....................22222222222222222222222.....................
            ..................222222222222222222222222222...................
            ................2222222222222222222222222222222.................
            ..............22222222222222222222222222222222222...............
            .............2222222222222222222222222222222222222..............
            ............222222222222222222222222222222222222222.............
            ..........2222222222222222222222222222222222222222222...........
            .........222222222222222222222222222222222222222222222..........
            ........22222222222222222222222222222222222222222222222.........
            .......2222222222222222222222222222222222222222222222222........
            .......2222222222222222222222222222222222222222222222222........
            ......222222222222222222222222222222222222222222222222222.......
            .....22222222222222222222222222222222222222222222222222222......
            ....2222222222222222222222222222222222222222222222222222222.....
            ....2222222222222222222222222222222222222222222222222222222.....
            ...222222222222222222222222222222222222222222222222222222222....
            ...222222222222222222222222222222222222222222222222222222222....
            ..22222222222222222222222222222222222222222222222222222222222...
            ..22222222222222222222222222222222222222222222222222222222222...
            .2222222222222222222222222222222222222222222222222222222222222..
            .2222222222222222222222222222222222222222222222222222222222222..
            .2222222222222222222222222222222222222222222222222222222222222..
            .2222222222222222222222222222222222222222222222222222222222222..
            222222222222222222222222222222222222222222222222222222222222222.
            222222222222222222222222222222222222222222222222222222222222222.
            222222222222222222222222222222222222222222222222222222222222222.
            222222222222222222222222222222222222222222222222222222222222222.
            222222222222222222222222222222222222222222222222222222222222222.
            222222222222222222222222222222222222222222222222222222222222222.
            222222222222222222222222222222222222222222222222222222222222222.
            222222222222222222222222222222222222222222222222222222222222222.
            222222222222222222222222222222222222222222222222222222222222222.
            222222222222222222222222222222222222222222222222222222222222222.
            222222222222222222222222222222222222222222222222222222222222222.
            222222222222222222222222222222222222222222222222222222222222222.
            222222222222222222222222222222222222222222222222222222222222222.
            222222222222222222222222222222222222222222222222222222222222222.
            222222222222222222222222222222222222222222222222222222222222222.
            .2222222222222222222222222222222222222222222222222222222222222..
            .2222222222222222222222222222222222222222222222222222222222222..
            .2222222222222222222222222222222222222222222222222222222222222..
            .2222222222222222222222222222222222222222222222222222222222222..
            ..22222222222222222222222222222222222222222222222222222222222...
            ..22222222222222222222222222222222222222222222222222222222222...
            ...222222222222222222222222222222222222222222222222222222222....
            ...222222222222222222222222222222222222222222222222222222222....
            ....2222222222222222222222222222222222222222222222222222222.....
            ....2222222222222222222222222222222222222222222222222222222.....
            .....22222222222222222222222222222222222222222222222222222......
            ......222222222222222222222222222222222222222222222222222.......
            .......2222222222222222222222222222222222222222222222222........
            .......2222222222222222222222222222222222222222222222222........
            ........22222222222222222222222222222222222222222222222.........
            .........222222222222222222222222222222222222222222222..........
            ..........2222222222222222222222222222222222222222222...........
            ............222222222222222222222222222222222222222.............
            .............2222222222222222222222222222222222222..............
            ..............22222222222222222222222222222222222...............
            ................2222222222222222222222222222222.................
            ..................222222222222222222222222222...................
            ....................22222222222222222222222.....................
            ........................222222222222222.........................
            ................................................................
            `, shader.ShadeLevel.One)
    }
    activePatrolSprite = sprite
}
function placeWaypoints () {
    waypoint.placeWaypoint(tiles.getTileLocation(1, 6), SpriteKind.Enemy, waypoint.Direction.RIGHT)
    waypoint.placeWaypoint(tiles.getTileLocation(8, 6), SpriteKind.Enemy, waypoint.Direction.LEFT)
    waypoint.placeWaypoint(tiles.getTileLocation(12, 9), SpriteKind.Enemy, waypoint.Direction.DOWN)
    waypoint.placeWaypoint(tiles.getTileLocation(12, 14), SpriteKind.Enemy, waypoint.Direction.UP)
    waypoint.placeWaypoint(tiles.getTileLocation(3, 9), SpriteKind.Enemy, waypoint.Direction.RIGHT)
    waypoint.placeWaypoint(tiles.getTileLocation(10, 9), SpriteKind.Enemy, waypoint.Direction.LEFT)
}
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    // remove if eliminated
    if (activePatrolSprite == sprite) {
        alertRange.destroy()
        enemyCursor.destroy()
    }
})
function createPatrol (col: number, row: number, vx: number, vy: number) {
    patrolSprite = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....fc111cbfbfc111cf....
        ....f1b1b1ffff1b1b1f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Enemy)
    tiles.placeOnTile(patrolSprite, tiles.getTileLocation(col, row))
    patrolSprite.setVelocity(vx, vy)
    patrolSprites.push(patrolSprite)
}
let patrolSprite: Sprite = null
let activePatrolSprite: Sprite = null
let alertRange: Sprite = null
let hiding = false
let enemyCursor: Sprite = null
let currentSelectedEnemySprite: Sprite = null
let i = 0
let playerSprite: Sprite = null
let currentSelectedEnemyIndex = 0
let patrolSprites :Sprite[] = []
currentSelectedEnemyIndex = -1
tiles.setTilemap(tilemap`level`)
createPatrol(8, 4, 0, 0)
createPatrol(4, 6, 30, 0)
createPatrol(12, 11, 0, -20)
createPatrol(6, 9, 30, 0)
placeWaypoints()
playerSprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . b 5 5 b . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . b b b b b 5 5 5 5 5 5 5 b . . 
    . b d 5 b 5 5 5 5 5 5 5 5 b . . 
    . . b 5 5 b 5 d 1 f 5 d 4 f . . 
    . . b d 5 5 b 1 f f 5 4 4 c . . 
    b b d b 5 5 5 d f b 4 4 4 4 b . 
    b d d c d 5 5 b 5 4 4 4 4 4 4 b 
    c d d d c c b 5 5 5 5 5 5 5 b . 
    c b d d d d d 5 5 5 5 5 5 5 b . 
    . c d d d d d d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `, SpriteKind.Player)
tiles.placeOnTile(playerSprite, tiles.getTileLocation(1, 1))
controller.moveSprite(playerSprite)
scene.cameraFollowSprite(playerSprite)

game.onUpdate(function() {
    if (enemyCursor != null) {
        enemyCursor.x = activePatrolSprite.x
        enemyCursor.y = activePatrolSprite.y-16
    }

    if (alertRange != null) {
        alertRange.x = activePatrolSprite.x
        alertRange.y = activePatrolSprite.y
    }

    for (let enemy of sprites.allOfKind(SpriteKind.Enemy)) {
        if (sight.isInSight(enemy, playerSprite, 40, false) && !hiding) {
            enemy.say("Intruder")
            scene.cameraFollowSprite(enemy)
            music.siren.play()
            controller.moveSprite(playerSprite, 0, 0)
            control.runInParallel(function() {
                pause(2000)
                game.over()    
            })
        } else {
            enemy.say("")
        }
    }
})
