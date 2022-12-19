import React, { useState, useEffect } from 'react';
import "./App.css"

// Functional component App
function App() {
  const [team, setTeam] = useState(0);
  const [players, setPlayers] = useState([]);
  const [stats, setStats] = useState('');
  const [search, setSearch] = useState('');

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '80bc2cb05ea3c3f4262a377b243b0f46',
      'X-RapidAPI-Host': 'v2.nba.api-sports.io/'
    }
  };
  // 80bc2cb05ea3c3f4262a377b243b0f46

  const getTeam = async () => {
    fetch(` https://v2.nba.api-sports.io/teams?search=${search}`, options)
      .then(res => res.json())
      .then(res => {
        let id = Number(res.response[0].id)
        console.log(id)
        setTeam(id)
      })
      .catch(err => console.error(err));
  }

  const getPlayers = async () => {
    fetch(`https://v2.nba.api-sports.io/players?team=${team}&season=2022`, options)
      .then(res => res.json())
      .then(res => {
        console.log(res.response)
        setPlayers(res.response)
      })
      .catch(err => console.error(err));
  }

  const getStats = async () => {
    fetch(`https://api-nba-v1.p.rapidapi.com/teams/statistics?${team}&season=2022`, options)
      .then(res => res.json())
      .then(res => {
        setStats(res.response)
        console.log(setStats)
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    getPlayers()
  }, [team])

  return (
    <main>
      <img src="NBA.png" alt="NBA Logo" id="nbaLogo"></img>
      <h1> Stats</h1>
      <input type="text" className="search-bar" placeholder="Enter the team"
        onChange={(event) => {
          // if (event.key === "Enter") {
          setSearch(event.target.value);
          // }
        }} onKeyPress={(event) => {
          if (event.key === "Enter") {
            getTeam();
          }
        }} />

      {players.length > 0 ? <table>
        <tr>
            <th> Name </th>
            <th> Height </th>
            <th> Weight </th>
            <th> College </th>
            <th> Position </th>
            <th> Jersey Number </th>
          </tr>
        {players.map(player=> {
          return (

           
            <tr>
              {/* <td> */}
              <td>{player.firstname} {player.lastname} </td>
              <td>{player.height.feets}'{player.height.inches}''</td>
              <td>{player.weight.pounds} </td>
              <td>{player.college} </td>
              <td>{player.leagues.standard.pos} </td>
              <td>{player.leagues.standard.jersey} </td>
              {/* </td> */}
            </tr>
          )
        })}
      </table> : <div>
        <ol>
          <li>Atlanta Hawks </li>
          <li> Boston Celtics </li>
          <li> Brooklyn Nets </li>
          <li> Charlotte Hornets </li>
          <li> Chicago Bulls </li>
          <li> Cleveland Cavaliers </li>
          <li> Dallas Mavericks </li>
          <li> Denver Nuggets </li>
          <li> Detroit Pistons </li>
          <li> Golden State Warriors </li>
          <li> Houston Rockets </li>
          <li> Indiana Pacers </li>
          <li> Los Angeles Clippers </li>
          <li> Los Angeles Lakers </li>
          <li> Memphis Grizzlies </li>
          <li> Miami Heat </li>
          <li> Milwaukee Bucks </li>
          <li> Minnesota Timberwolves </li>
          <li> New Orleans Pelicans </li>
          <li> New York Knicks </li>
          <li> Oklahoma City Thunder </li>
          <li> Orlando Magic </li>
          <li> Philadelphia 76ers </li>
          <li> Phoenix Suns </li>
          <li> Portland Trail Blazers </li>
          <li> Sacramento Kings </li>
          <li> San Antonio Spurs </li>
          <li> Toronto Raptors </li>
          <li> Utah Jazz </li>
          <li> Washington Wizards </li>
        </ol>
      </div> }
      <div>
      {team.games}
      </div>
    </main>
  )
}


export default App;
