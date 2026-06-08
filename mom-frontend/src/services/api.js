const API_URL =
  "http://localhost:5000/api";

export const startMeeting = async (
  data
) => {

  const response = await fetch(
    `${API_URL}/meetings/start`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};

export const stopMeeting = async (
  meetingId
) => {

  const response = await fetch(
    `${API_URL}/meetings/stop`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        meeting_id: meetingId,
      }),
    }
  );

  return response.json();
};

export const uploadAudio = async (
  meetingId,
  audioBlob
) => {

  const formData =
    new FormData();

  formData.append(
    "meeting_id",
    meetingId
  );

  formData.append(
    "audio_file",
    audioBlob,
    "meeting.webm"
  );

  const response = await fetch(
    `${API_URL}/meetings/upload-audio`,
    {
      method: "POST",
      body: formData,
    }
  );

  return response.json();
};

export const getSummary = async (
  meetingId
) => {

  const response = await fetch(
    `${API_URL}/meetings/${meetingId}/summary`
  );

  return response.json();
};