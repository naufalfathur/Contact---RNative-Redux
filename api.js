const processContact = (contact) => ({
  name: `${contact.name.first} ${contact.name.last}`,
  phone: contact.phone,
});

export const fetchUsers = async () => {
  const response = await fetch("https://randomuser.me/api/?results=50");
  const { results } = await response.json();
  return results.map(processContact);
};

export const login = async (username, password) => {
  const response = await fetch("http://192.168.0.107:8000/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  //https://dev.to/osmanforhad/unhandled-promise-rejection-typeerror-network-request-failed-solution-react-redux-39ei

  if (response.ok) {
    return true
  }

  const errMessage = await response.text();
  throw new Error(errMessage)
};
