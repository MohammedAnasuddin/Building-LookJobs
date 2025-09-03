import { Button, Container, Modal } from "@mantine/core";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import HeaderMegaMenu from '../Home/Header/Header';
import  JobFormModal from './Job_Form'
import Card_grids from "./cards_grid";

export default function Dashboard() {
  const { logout, user } = useAuth0();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div size="xl">

        <HeaderMegaMenu></HeaderMegaMenu>
      <Container size="xs" style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>Welcome, {user?.name}!</h1>
      <p>Your email: {user?.email}</p>

      <Card_grids></Card_grids>
    </Container>
    </div>
  );
}


