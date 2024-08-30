import "./App.css";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";

function App() {
  const responseGoogle = (response) => {
    console.log(response);
    const { code } = response;
    axios
      .post("/api/create-tokens", { code })
      .then((response) => {
        console.log(response.data);
        setSignedIn(true);
      })
      .catch((error) => console.log(error.message));
  };

  const responseError = (error) => {
    console.log(error);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    // console.log(eventName, description, startDateTime, endDateTime);
    axios
      .post("/api/create-event", {
        eventName,
        description,
        startDateTime,
        endDateTime,
      })
      .then((response) => {
        console.log(response.data);
        setSignedIn(true);
      })
      .catch((error) => console.log(error.message));
  };

  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [startDateTime, setStartDate] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const [signedIn, setSignedIn] = useState(false);

  return (
    <>
      <h1>Google Calendar API</h1>

      {!signedIn ? (
        <GoogleOAuthProvider clientId="137405534684-llukdrr5akrc787l53l7e97ktot9gd5a.apps.googleusercontent.com">
          <div>
            <LoginButton onSuccess={responseGoogle} onError={responseError} />
          </div>
        </GoogleOAuthProvider>
      ) : (
        <div>
          <form onSubmit={handelSubmit}>
            <lable htmlFor="eventName">Event Name</lable>
            <br />
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <br />

            <lable htmlFor="description">Event Description</lable>
            <br />
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />

            <lable htmlFor="startDateTime">Start Date Time</lable>
            <br />
            <input
              type="datetime-local"
              id="startDateTime"
              value={startDateTime}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <br />

            <lable htmlFor="endDateTime">End Date Time</lable>
            <br />
            <input
              type="datetime-local"
              id="endDateTime"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
            />
            <br />
            <button type="submit">Create Event</button>
          </form>
        </div>
      )}
    </>
  );
}

function LoginButton({ onSuccess, onError }) {
  const login = useGoogleLogin({
    onSuccess,
    onError,
    flow: "auth-code",
    scope: "openid email profile https://www.googleapis.com/auth/calendar",
    accessType: "offline",
  });

  return <button onClick={() => login()}>Sign in & Authorize Calendar</button>;
}

export default App;
