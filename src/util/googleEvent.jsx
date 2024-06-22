// export async function createCalendarEvent(meetingData, attendees) {
//   try {
//     const sessionToken = sessionStorage.getItem("AccessToken");
//     if (!sessionToken) {
//       throw new Error("Access token not found in session storage");
//     }

//     const event = {
//       summary: meetingData.appointmentTitle || "",
//       description: meetingData.appointmentDescription || "",
//       start: {
//         dateTime: `${meetingData.appointmentStartDate}T${meetingData.appointmentStartTime}:00`,
//         timeZone: "Asia/Kolkata",
//       },
//       end: {
//         dateTime: `${meetingData.appointmentEndDate}T${meetingData.appointmentEndTime}:00`,
//         timeZone: "Asia/Kolkata",
//       },
//       attendees: attendees.map((email) => ({ email })),
//     };

//     const response = await fetch(
//       "https://www.googleapis.com/calendar/v3/calendars/primary/events",
//       {
//         method: "POST",
//         headers: {
//           Authorization: "Bearer " + sessionToken,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(event),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to create event: " + response.statusText);
//     }

//     const responseData = await response.json();
//     console.log(responseData);
//     alert("Event created, check your Google Calendar!");
//   } catch (error) {
//     console.error("Error creating event:", error);
//     alert("Error creating event: " + error.message);
//   }
// }

export async function createCalendarEvent(meetingData, attendees) {
  try {
    const sessionToken = sessionStorage.getItem("AccessToken");
    if (!sessionToken) {
      throw new Error("Access token not found in session storage");
    }

    const event = {
      summary: meetingData.appointmentTitle || "",
      description: meetingData.appointmentDescription || "",
      start: {
        dateTime: `${meetingData.appointmentStartDate}T${meetingData.appointmentStartTime}:00`,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: `${meetingData.appointmentEndDate}T${meetingData.appointmentEndTime}:00`,
        timeZone: "Asia/Kolkata",
      },
      attendees: attendees.map((email) => ({ email })),
    };

    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create event: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    alert("Event created, check your Google Calendar!");
  } catch (error) {
    console.error("Error creating event:", error);
    alert(`Error creating event: ${error.message}`);
  }
}

// export async function createGoogleCalenderEvent(meetingData, attendees) {
//   if (!meetingData) {
//     return;
//   }
//   console.log(meetingData);
//   const authenticate = async () => {
//     const auth = new google.auth.GoogleAuth({
//       clientId: baseURL.google_Client_ID,
//       clientSecret: baseURL.client_secrect,
//       scopes: ["https://www.googleapis.com/auth/calendar"],
//     });

//     try {
//       const authToken = await auth.getClient();
//       return authToken;
//     } catch (error) {
//       console.error("Authentication error:", error);
//       return null;
//     }
//   };
//   const createEvent = async (auth) => {
//     const calendar = google.calendar({ version: "v3", auth });
//     const event = {
//       summary: meetingData.appointmentTitle || "",
//       description: meetingData.appointmentDescription || "",
//       start: {
//         dateTime: `${meetingData.appointmentStartDate}T${meetingData.appointmentStartTime}:00`,
//         timeZone: "Asia/Kolkata",
//       },
//       end: {
//         dateTime: `${meetingData.appointmentStartDate}T${meetingData.appointmentEndTime}:00`,
//         timeZone: "Asia/Kolkata",
//       },
//       attendees: attendees.map((email) => ({ email })),
//     };

//     try {
//       const response = await calendar.events.insert({
//         calendarId: "primary",
//         resource: event,
//       });
//       return response.data;
//     } catch (error) {
//       throw new Error("Error creating event:", error);
//     }
//   };

//   e.preventDefault();
//   const auth = await authenticate();
//   if (auth) {
//     try {
//       const event = await createEvent(auth);
//       console.log("Event created:", event);
//     } catch (error) {
//       console.error("Error creating event:", error);
//     }
//   }
// }

// // const createEvent = async (auth) => {
// //   const calendar = google.calendar({ version: "v3", auth });
// //   const event = {
// //     summary: formData.title,
// //     description: formData.description,
// //     start: {
// //       dateTime: `${formData.date}T${formData.time}:00`,
// //       timeZone: "Asia/Kolkata",
// //     },
// //     end: {
// //       dateTime: `${formData.date}T${formData.time}:00`,
// //       timeZone: "Asia/Kolkata",
// //     },
// //     attendees: attendees.map((email) => ({ email })),
// //   };

// //   try {
// //     const response = await calendar.events.insert({
// //       calendarId: "primary",
// //       resource: event,
// //     });
// //     return response.data;
// //   } catch (error) {
// //     throw new Error("Error creating event:", error);
// //   }
// // };
