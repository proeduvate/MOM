import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

function SettingsForm() {

  const { user, setUser } = useContext(UserContext);

  const [form, setForm] = useState(user);

  const handleSave = () => {

  const updatedUser = {
    ...form,
  };

  setUser(updatedUser);

  localStorage.setItem(
    "username",
    form.name
  );

  localStorage.setItem(
    "email",
    form.email
  );

  alert("Profile Updated");

  window.location.reload();

};

  return (
    <div className="bg-white p-8 rounded-3xl mt-10">

      <h2 className="text-3xl font-bold mb-8">
        Profile
      </h2>

      <div className="grid grid-cols-2 gap-5">

        <input
          type="text"
          value={form.name}
          placeholder="Username"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
          className="border p-4 rounded-xl"
        />

        <input
          type="email"
          value={form.email}
          placeholder="Email"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
          className="border p-4 rounded-xl"
        />

        <input
          type="text"
          value={form.organization}
          placeholder="Organization"
          onChange={(e) =>
            setForm({
              ...form,
              organization: e.target.value
            })
          }
          className="border p-4 rounded-xl"
        />

        <input
          type="text"
          value={form.role}
          placeholder="Role"
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value
            })
          }
          className="border p-4 rounded-xl"
        />

      </div>

      <button
        onClick={handleSave}
        className="mt-8 bg-green-600 text-white px-8 py-4 rounded-xl"
      >
        Save Changes
      </button>

    </div>
  );
}

export default SettingsForm;