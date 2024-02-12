"use client";
import Image from "next/image";

export default function Home() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <button>SIGN IN</button>
  );
}
