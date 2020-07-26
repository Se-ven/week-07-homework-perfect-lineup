// Lineup Validator

/*
1) The total salary of all players in a lineup may not exceed $45, 000
2) Lineups may not contain more than 2 players from a single team
3) Lineups may not contain more than 3 players from a single game
4) Lineups must contain exactly 3 players with the position of 'OF' and must also contain exactly 1 player from each of the following positions: 'P', 'C', '1B', '2B', '3B', 'SS'
*/

// properties: 
/* 
lineup.
id, name, position, teamId, gameId, salary
*/

// Main function call that returns the resulting values of each specific
// test function.

function validateLineup(lineup) {
  return calculateTotalSalary(lineup) &&
  playerTeamCount(lineup) &&
  validateGameCount(lineup) &&
  maxPosition(lineup) &&
  lineup.length === 9
}

// Salary requirement function, tests to see if all salaries from the players on a team
// equal less than or equal to $45,000 in total.

function calculateTotalSalary(lineup) {
  let totalSalary = lineup.reduce((total, player) => total += player.salary, 0)

  return totalSalary <= 45000
}

// Function that calculates the total number of baseball positions
// on a given team: three 'OF' roles and one of each of the remaining
// positions.

function maxPosition(lineup) {
  let pitcherCount = 0
  let catcherCount = 0
  let firstBaseCount = 0
  let secondBaseCount = 0
  let thirdBaseCount = 0
  let shortStopCount = 0
  let outFieldCount = 0

  for (let player of lineup) {
    switch (player.position) {
      case 'P':
        pitcherCount++
        break
      case 'C':
        catcherCount++
        break
      case '1B':
        firstBaseCount++
        break
      case '2B':
        secondBaseCount++
        break
      case '3B':
        thirdBaseCount++
        break
      case 'SS':
        shortStopCount++
        break
      default:
        outFieldCount++
        break
    }
  }

  return pitcherCount === 1 &&
  catcherCount === 1 &&
  firstBaseCount === 1 &&
  secondBaseCount === 1 &&
  thirdBaseCount === 1 &&
  shortStopCount === 1 &&
  outFieldCount === 3
}

// Iterates over the gameId properties and tracks the number of players
// per game

function validateGameCount(lineup) {
  const playersPerGame = lineup.reduce((gameObject, player) => {
    const { gameId } = player

    if (gameObject[gameId]) {
      gameObject[gameId]++
    } else {
      gameObject[gameId] = 1
    }

    return gameObject
  }, {})

  for (let index in playersPerGame) {
    if (playersPerGame[index] > 3) return false
  }

  return true
}

// Tracks the number of specific players from a given team in a lineup

function playerTeamCount(lineup) {
  const playersPerTeam = lineup.reduce((gameObject, player) => {
    const { teamId } = player

    if (gameObject[teamId]) {
      gameObject[teamId]++
    } else {
      gameObject[teamId] = 1
    }

    return gameObject
  }, {})

  for (let index in playersPerTeam) {
    if (playersPerTeam[index] > 2) return false
  }

  return true
}






module.exports = validateLineup



