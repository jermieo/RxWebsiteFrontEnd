import React from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const User = () => {
  const navigation = useNavigate();
  const removetocken = () => {
    localStorage.removeItem("AuthorizationJwt");
    navigation("/");
  };
  useEffect(() => {
    if (!localStorage.getItem("AuthorizationJwt")) {
      navigation("/login");
    }
  }, []);
  return (
    <div style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}>
      <h3 style={{ textAlign: "center", color: "red" }}>
        Wellcome to Userpage
      </h3>
      <p style={{ justifyContent: "center" }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, debitis
        quidem nostrum amet maiores iusto dicta cumque distinctio? Ducimus
        perferendis accusantium soluta, tenetur voluptate eos sint dolores
        itaque placeat sequi? Fugit eos cupiditate doloremque porro ullam
        impedit, eveniet exercitationem mollitia. Adipisci, sapiente amet, illo
        excepturi dignissimos dolores pariatur accusantium dicta eum id animi
        magni velit explicabo quis hic. Velit ipsa cupiditate et blanditiis
        similique repellendus quisquam quas nulla nostrum. Corrupti laboriosam
        culpa, natus neque voluptatibus quo eum maiores mollitia aliquid
        recusandae dolor corporis provident, libero rem eaque esse possimus
        nesciunt sunt molestias unde quibusdam ut! Velit at sapiente officiis
        itaque?
      </p>
      <div>
        <Button
          onClick={removetocken}
          variant="success"
          type="submit"
          style={{ border: "2px", borderRadius: "15px" }}
        >
          LogOut
        </Button>
      </div>
    </div>
  );
};

export default User;
