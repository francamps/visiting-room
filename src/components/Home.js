import React from "react"
import { Link, navigate } from "gatsby"

import Play from "./Play"
import HomeVideo from "./HomeVideo"
import "./Home.css"

const Home = () => {
  return (
    <div className="home">
      <div className="landing">
        <HomeVideo />
        <div className="text-on-landing" style={{ position: "absolute" }}>
          <div className="title">The Visiting Room</div>
          <div className="subtitle">
            An archive and visiting room of the 527 men who are serving life
            without parole at Louisiana State Penitentiary - Angola.
          </div>
          <Play
            size="huge"
            onClick={() => {
              navigate("/visiting-room")
              //setView(3);
            }}
          />
        </div>
      </div>
      <section className="copy-wrap">
        <article className="copy">
          <div className="lede">
            <div className="lede-initial">T</div>
            <p className="lede-content">
              his an introduction text. It has a fixed size, and a custom line
              height, so you can experiment with it. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            dapibus vulputate diam eu pretium. Mauris elit orci, ultricies id
            fermentum vel, porta et eros. Vestibulum condimentum lectus in
            convallis feugiat. Sed vulputate fringilla felis. Aliquam ut arcu et
            dui feugiat scelerisque eu quis diam. Mauris placerat congue dui sit
            amet blandit. Phasellus condimentum libero vel velit auctor, sit
            amet tincidunt velit varius.
          </p>

          <p>
            Mauris lacinia porta faucibus. Fusce eu est ac eros vulputate mollis
            in ac felis. Aenean commodo scelerisque mi sed imperdiet. Donec at
            hendrerit nisi, eget vestibulum nisi. Sed sit amet magna luctus,
            facilisis erat quis, sagittis ligula. Aenean dignissim velit quis
            leo consequat ultricies. Proin quis pretium justo. Vestibulum at
            eros nisl. Fusce lobortis erat ante, eu cursus sapien molestie at.
            Pellentesque placerat ante diam, et euismod lacus dictum vel.
            Phasellus vitae sollicitudin mi.
          </p>

          <p>
            Mauris lacinia porta faucibus. Fusce eu est ac eros vulputate mollis
            in ac felis. Aenean commodo scelerisque mi sed imperdiet. Donec at
            hendrerit nisi, eget vestibulum nisi. Sed sit amet magna luctus,
            facilisis erat quis, sagittis ligula. Aenean dignissim velit quis
            leo consequat ultricies. Proin quis pretium justo. Vestibulum at
            eros nisl. Fusce lobortis erat ante, eu cursus sapien molestie at.
            Pellentesque placerat ante diam, et euismod lacus dictum vel.
            Phasellus vitae sollicitudin mi.
          </p>

          <p>
            Mauris lacinia porta faucibus. Fusce eu est ac eros vulputate mollis
            in ac felis. Aenean commodo scelerisque mi sed imperdiet. Donec at
            hendrerit nisi, eget vestibulum nisi. Sed sit amet magna luctus,
            facilisis erat quis, sagittis ligula. Aenean dignissim velit quis
            leo consequat ultricies. Proin quis pretium justo. Vestibulum at
            eros nisl. Fusce lobortis erat ante, eu cursus sapien molestie at.
            Pellentesque placerat ante diam, et euismod lacus dictum vel.
            Phasellus vitae sollicitudin mi.
          </p>
        </article>
        <Link to="/visiting-room">
          <div
            className="button go-to-vr"
            onClick={() => {
              navigate("/visiting-room")
            }}
          >
            <div class="link-wrap">
              <span className="hover-link">Go to the Visiting Room ></span>
            </div>
          </div>
        </Link>
        <Link to="/timeline">
          <div
            className="button go-to-vr"
            onClick={() => {
              navigate("/timeline")
            }}
          >
            <div className="link-wrap">
              <span className="hover-link">
                Learn the history of Life Without Parole sentencing
              </span>
            </div>
          </div>
        </Link>
      </section>

      <section className="footer">
        <ul>
          <li>
            <h5>Produced with the support of:</h5>
          </li>
          <li>Vital Projects Fund</li>
          <li>Loyola University at New Orleans</li>
          <li>NEW INC</li>
        </ul>
      </section>
    </div>
  )
}

export default Home
