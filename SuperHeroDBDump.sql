--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: SuperHeroDB; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "SuperHeroDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';


ALTER DATABASE "SuperHeroDB" OWNER TO postgres;

\connect "SuperHeroDB"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ImageToHero; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ImageToHero" (
    id integer NOT NULL,
    "pathToImage" text NOT NULL,
    "idSuperHero" integer NOT NULL
);


ALTER TABLE public."ImageToHero" OWNER TO postgres;

--
-- Name: ImageToHero_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ImageToHero_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ImageToHero_id_seq" OWNER TO postgres;

--
-- Name: ImageToHero_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ImageToHero_id_seq" OWNED BY public."ImageToHero".id;


--
-- Name: SuperHero; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SuperHero" (
    id integer NOT NULL,
    "nickName" text NOT NULL,
    "realName" text NOT NULL,
    original_description text NOT NULL,
    "superPowers" text NOT NULL,
    "catchPhrase" text NOT NULL
);


ALTER TABLE public."SuperHero" OWNER TO postgres;

--
-- Name: SuperHero_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SuperHero_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SuperHero_id_seq" OWNER TO postgres;

--
-- Name: SuperHero_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SuperHero_id_seq" OWNED BY public."SuperHero".id;


--
-- Name: ImageToHero id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ImageToHero" ALTER COLUMN id SET DEFAULT nextval('public."ImageToHero_id_seq"'::regclass);


--
-- Name: SuperHero id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SuperHero" ALTER COLUMN id SET DEFAULT nextval('public."SuperHero_id_seq"'::regclass);


--
-- Data for Name: ImageToHero; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ImageToHero" (id, "pathToImage", "idSuperHero") FROM stdin;
\.


--
-- Data for Name: SuperHero; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SuperHero" (id, "nickName", "realName", original_description, "superPowers", "catchPhrase") FROM stdin;
27	flash	flash	flash	flash	flash
30	flash	flash	flash	flash	flash
28	flashggh	flash	flash	flash	flash
29	flash222333	flash	flash	flash	flash
26	SuperMan	Clark Kent	he was born Kal-El on the planet Krypton, before being rocketed to\nEarth as an infant by his scientist father Jor-El, moments before Krypton's destruction...	​solar energy absorption and healing factor, solar flare and heat vision,\nsolar invulnerability, flight...	“Look, up in the sky, it's a bird, it's a plane, it's Superman!”
\.


--
-- Name: ImageToHero_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ImageToHero_id_seq"', 37, true);


--
-- Name: SuperHero_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SuperHero_id_seq"', 32, true);


--
-- Name: SuperHero SuperHero_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SuperHero"
    ADD CONSTRAINT "SuperHero_pkey" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

