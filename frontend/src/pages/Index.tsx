import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import CoupleSpace from "@/components/CoupleSpace";

interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface SpaceData {
  pairCode: string;
  user: GoogleUser;
}

const Index = () => {
  const [currentSpace, setCurrentSpace] = useState<SpaceData | null>(null);

  const handleEnterSpace = (pairCode: string, user: GoogleUser) => {
    setCurrentSpace({ pairCode, user });
  };

  const handleLeaveSpace = () => {
    setCurrentSpace(null);
  };

  return (
    <>
      {currentSpace ? (
        <CoupleSpace 
          pairCode={currentSpace.pairCode}
          user={currentSpace.user}
          onLeave={handleLeaveSpace}
        />
      ) : (
        <LandingPage onEnterSpace={handleEnterSpace} />
      )}
    </>
  );
};

export default Index;
