import React from 'react';

import './HeroesDemo.css';

// ScrollMotionmple images
import bootstrapLogo from './images/bootstrap-logo.svg';
import bootstrapThemes from './images/bootstrap-themes.png';
import bootstrapDocs from './images/bootstrap-docs.png';

// import { ScrollMotionContainer, ScrollMotionItem } from '../ScrollMotion'
import {
    ScrollMotionContainer,
    ScrollMotionItem,
} from '../../../components/ScrollMotion';

export default function HeroesDemo(props) {
    return (
        <>
            <main>
                <h1 className="visually-hidden">Heroes examples</h1>

                <ScrollMotionContainer
                    element="div"
                    className="px-4 py-5 my-5 text-center"
                >
                    <ScrollMotionItem
                        element="img"
                        className="d-block mx-auto mb-4"
                        src={bootstrapLogo}
                        alt=""
                        width="72"
                        height="57"
                    />
                    <ScrollMotionItem
                        element="h1"
                        type="up"
                        className="display-5 fw-bold"
                    >
                        Centered hero
                    </ScrollMotionItem>
                    <div className="col-lg-6 mx-auto">
                        <ScrollMotionItem
                            element="p"
                            type="up"
                            className="lead mb-4"
                        >
                            Quickly design and customize responsive mobile-first
                            sites with Bootstrap, the world’s most popular
                            front-end open source toolkit, featuring
                            ScrollMotionss variables and mixins, responsive grid
                            system, extensive prebuilt components, and powerful
                            JavaScript plugins.
                        </ScrollMotionItem>
                        <ScrollMotionItem
                            element="div"
                            className="d-grid gap-2 d-sm-flex justify-content-sm-center"
                        >
                            <button
                                type="button"
                                className="btn btn-primary btn-lg px-4 gap-3"
                            >
                                Primary button
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary btn-lg px-4"
                            >
                                Secondary
                            </button>
                        </ScrollMotionItem>
                    </div>
                </ScrollMotionContainer>

                <div className="b-example-divider"></div>

                <ScrollMotionContainer
                    element="div"
                    className="px-4 pt-5 my-5 text-center border-bottom"
                >
                    <ScrollMotionItem
                        element="h1"
                        type="up"
                        className="display-4 fw-bold"
                    >
                        Centered screenshot
                    </ScrollMotionItem>
                    <div className="col-lg-6 mx-auto">
                        <ScrollMotionItem
                            element="p"
                            type="up"
                            className="lead mb-4"
                        >
                            Quickly design and customize responsive mobile-first
                            sites with Bootstrap, the world’s most popular
                            front-end open source toolkit, featuring
                            ScrollMotionss variables and mixins, responsive grid
                            system, extensive prebuilt components, and powerful
                            JavaScript plugins.
                        </ScrollMotionItem>
                        <ScrollMotionItem
                            element="div"
                            className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5"
                        >
                            <button
                                type="button"
                                className="btn btn-primary btn-lg px-4 me-sm-3"
                            >
                                Primary button
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary btn-lg px-4"
                            >
                                Secondary
                            </button>
                        </ScrollMotionItem>
                    </div>
                    <div
                        className="overflow-hidden"
                        style={{ maxHeight: '30vh' }}
                    >
                        <div className="container px-5">
                            <ScrollMotionItem
                                element="img"
                                type="up"
                                src={bootstrapDocs}
                                className="img-fluid border rounded-3 shadow-lg mb-4"
                                alt="Example"
                                width="700"
                                height="500"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </ScrollMotionContainer>

                <div className="b-example-divider"></div>

                <ScrollMotionContainer
                    amount={0.8}
                    element="div"
                    className="container col-xxl-8 px-4 py-5"
                >
                    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                        <div className="col-10 col-sm-8 col-lg-6">
                            <ScrollMotionItem
                                element="img"
                                type="left"
                                src={bootstrapThemes}
                                className="d-block mx-lg-auto img-fluid"
                                alt="Bootstrap Themes"
                                width="700"
                                height="500"
                                loading="lazy"
                            />
                        </div>
                        <div className="col-lg-6">
                            <ScrollMotionItem
                                element="h1"
                                type="left"
                                className="display-5 fw-bold lh-1 mb-3"
                            >
                                Responsive left-aligned hero with image
                            </ScrollMotionItem>
                            <ScrollMotionItem
                                element="p"
                                type="right"
                                className="lead"
                            >
                                Quickly design and customize responsive
                                mobile-first sites with Bootstrap, the world’s
                                most popular front-end open source toolkit,
                                featuring ScrollMotionss variables and mixins,
                                responsive grid system, extensive prebuilt
                                components, and powerful JavaScript plugins.
                            </ScrollMotionItem>
                            <ScrollMotionItem
                                element="div"
                                type="right"
                                className="d-grid gap-2 d-md-flex justify-content-md-start"
                            >
                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg px-4 me-md-2"
                                >
                                    Primary
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-lg px-4"
                                >
                                    Default
                                </button>
                            </ScrollMotionItem>
                        </div>
                    </div>
                </ScrollMotionContainer>

                <div className="b-example-divider"></div>

                <ScrollMotionContainer
                    element="div"
                    className="container col-xl-10 col-xxl-8 px-4 py-5"
                >
                    <div className="row align-items-center g-lg-5 py-5">
                        <div className="col-lg-7 text-center text-lg-start">
                            <ScrollMotionItem
                                element="h1"
                                type="up"
                                className="display-4 fw-bold lh-1 mb-3"
                            >
                                Vertically centered hero sign-up form
                            </ScrollMotionItem>
                            <ScrollMotionItem
                                element="p"
                                type="up"
                                className="col-lg-10 fs-4"
                            >
                                Below is an example form built entirely with
                                Bootstrap’s form controls. Each required form
                                group has a validation state that can be
                                triggered by attempting to submit the form
                                without completing it.
                            </ScrollMotionItem>
                        </div>
                        <ScrollMotionItem
                            element="div"
                            className="col-md-10 mx-auto col-lg-5"
                        >
                            <form className="p-4 p-md-5 border rounded-3 bg-light">
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                    />
                                    <label htmlFor="floatingInput">
                                        Email address
                                    </label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Password"
                                    />
                                    <label htmlFor="floatingPassword">
                                        Password
                                    </label>
                                </div>
                                <div className="checkbox mb-3">
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="remember-me"
                                        />{' '}
                                        Remember me
                                    </label>
                                </div>
                                <button
                                    className="w-100 btn btn-lg btn-primary"
                                    type="submit"
                                >
                                    Sign up
                                </button>
                                <hr className="my-4" />
                                <small className="text-muted">
                                    By clicking Sign up, you agree to the terms
                                    of use.
                                </small>
                            </form>
                        </ScrollMotionItem>
                    </div>
                </ScrollMotionContainer>

                <div className="b-example-divider"></div>

                <ScrollMotionContainer element="div" className="container my-5">
                    <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                        <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                            <ScrollMotionItem
                                element="h1"
                                type="up"
                                className="display-4 fw-bold lh-1"
                            >
                                Border hero with cropped image and shadows
                            </ScrollMotionItem>
                            <ScrollMotionItem
                                element="p"
                                type="up"
                                className="lead"
                            >
                                Quickly design and customize responsive
                                mobile-first sites with Bootstrap, the world’s
                                most popular front-end open source toolkit,
                                featuring ScrollMotionss variables and mixins,
                                responsive grid system, extensive prebuilt
                                components, and powerful JavaScript plugins.
                            </ScrollMotionItem>
                            <ScrollMotionItem
                                element="div"
                                type="up"
                                className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3"
                            >
                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
                                >
                                    Primary
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-lg px-4"
                                >
                                    Default
                                </button>
                            </ScrollMotionItem>
                        </div>
                        <ScrollMotionItem
                            element="div"
                            className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg"
                        >
                            <img
                                className="rounded-lg-3"
                                src={bootstrapDocs}
                                alt=""
                                width="720"
                            />
                        </ScrollMotionItem>
                    </div>
                </ScrollMotionContainer>

                <div className="b-example-divider"></div>

                <ScrollMotionContainer
                    element="div"
                    className="bg-dark text-secondary px-4 py-5 text-center"
                >
                    <div className="py-5">
                        <ScrollMotionItem
                            element="h1"
                            type="up"
                            className="display-5 fw-bold text-white"
                        >
                            Dark mode hero
                        </ScrollMotionItem>
                        <div className="col-lg-6 mx-auto">
                            <ScrollMotionItem
                                element="p"
                                type="up"
                                className="fs-5 mb-4"
                            >
                                Quickly design and customize responsive
                                mobile-first sites with Bootstrap, the world’s
                                most popular front-end open source toolkit,
                                featuring ScrollMotionss variables and mixins,
                                responsive grid system, extensive prebuilt
                                components, and powerful JavaScript plugins.
                            </ScrollMotionItem>
                            <ScrollMotionItem
                                element="div"
                                type="up"
                                className="d-grid gap-2 d-sm-flex justify-content-sm-center"
                            >
                                <button
                                    type="button"
                                    className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold"
                                >
                                    Custom button
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-light btn-lg px-4"
                                >
                                    Secondary
                                </button>
                            </ScrollMotionItem>
                        </div>
                    </div>
                </ScrollMotionContainer>

                <div className="b-example-divider mb-0"></div>
            </main>
        </>
    );
}
