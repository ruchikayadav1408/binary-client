import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './team.css';

const UserSponsors = ({ userId }) => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    
    const fetchUserSponsors = async () => {
      const UserSponserID = localStorage.getItem("userSponserId");
      console.log("UserSponserID from fetchUserSponsors: ", UserSponserID);
      // localStorage.setItem("userSponserId",sponserId);
      try {
        const response = await axios.get('http://localhost:3000/api/auth/my-team', {
          params: {
            sponsorId: UserSponserID
          }
        });
        setSponsors(response.data);
      } catch (error) {
        console.error("Error fetching user sponsors:", error);
      }
    };

    fetchUserSponsors();
  }, [userId]); // Add userId to the dependency array to trigger useEffect when userId changes

  return (
    <div   className="container">
      <h2>User Sponsors</h2>
      <div className="profile-section">

      {sponsors && sponsors.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>UserId</th>
              <th>Level</th>

            </tr>
          </thead>
          <tbody>
            {sponsors.map((sponsor) => (
              <tr key={sponsor.userId}>
                <td>{sponsor.name}</td>
                <td>{sponsor.position}</td>
                <td>{sponsor.userId}</td>
                <td>1</td>

              </tr>
            ))}
          </tbody>
        </table>
                  

      ) : (
        <p>No sponsors found</p>
      )}
                </div>

    </div>
  );
};

export default UserSponsors;
