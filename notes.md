<!--

  componentDidMount() {
    get map from localStorage
    init request ->
    response: startCooldown(), set response to currentRoom, roomCheck()
  }

  roomCheck():
    if room doesn't exist:
    check coords in each direction for known rooms
    for each known room, update adjacent exits with correspondoing room_id's
    update map with new room and connections
    if auto = true: makePath()

  makePath():
    are any exits unexplored? "?"
    if unexplored exit: update path
    if !path.length: do bfs for nearest unexplored exit (updates path)
    XX if path.length, startCooldown()
    else if !path.length: auto = false (all rooms explored)

  make button to flip auto, if true makePath()

  startCooldown -> set state: ticker -> tick()

  tick():
    if cooldown <= 0, if auto is true, func movePlayer()

  movePlayer():
    move request(path.dequeue, room_id):
    response: startCooldown(), roomCheck()

-->
