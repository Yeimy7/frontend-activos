import React from "react";

import { CardDataUser } from "../components/CardDataUser";
import { CardEditDataUser } from "../components/CardEditDataUser";
import { CardProfile } from "../components/CardProfile";

export const PersonalData = () => {
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <h1>Datos personales</h1>
          </div>
        </div>
      </section>
      <section>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <CardProfile/>
                <CardDataUser/>
              </div>
              <div className="col-md-9">
               <CardEditDataUser/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
