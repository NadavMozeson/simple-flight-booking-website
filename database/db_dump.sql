--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg120+1)
-- Dumped by pg_dump version 17.0 (Debian 17.0-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: airports; Type: TABLE; Schema: public; Owner: admin_user
--

CREATE TABLE public.airports (
    airport_id integer NOT NULL,
    code character(3) NOT NULL,
    name character varying(100) NOT NULL,
    city character varying(50) NOT NULL,
    country character varying(50) NOT NULL
);


ALTER TABLE public.airports OWNER TO admin_user;

--
-- Name: airports_airport_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_user
--

CREATE SEQUENCE public.airports_airport_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.airports_airport_id_seq OWNER TO admin_user;

--
-- Name: airports_airport_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_user
--

ALTER SEQUENCE public.airports_airport_id_seq OWNED BY public.airports.airport_id;


--
-- Name: bookings; Type: TABLE; Schema: public; Owner: admin_user
--

CREATE TABLE public.bookings (
    booking_id integer NOT NULL,
    flight_id integer,
    full_name character varying(100) NOT NULL,
    personal_id character varying(20) NOT NULL,
    booking_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(20) DEFAULT 'Pending'::character varying
);


ALTER TABLE public.bookings OWNER TO admin_user;

--
-- Name: bookings_booking_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_user
--

CREATE SEQUENCE public.bookings_booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookings_booking_id_seq OWNER TO admin_user;

--
-- Name: bookings_booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_user
--

ALTER SEQUENCE public.bookings_booking_id_seq OWNED BY public.bookings.booking_id;


--
-- Name: flights; Type: TABLE; Schema: public; Owner: admin_user
--

CREATE TABLE public.flights (
    flight_id integer NOT NULL,
    flight_number character varying(10) NOT NULL,
    origin_airport_id integer,
    destination_airport_id integer,
    departure_time timestamp without time zone NOT NULL,
    arrival_time timestamp without time zone NOT NULL,
    duration interval,
    price numeric(10,2) NOT NULL,
    available_seats integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.flights OWNER TO admin_user;

--
-- Name: flights_flight_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_user
--

CREATE SEQUENCE public.flights_flight_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.flights_flight_id_seq OWNER TO admin_user;

--
-- Name: flights_flight_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_user
--

ALTER SEQUENCE public.flights_flight_id_seq OWNED BY public.flights.flight_id;


--
-- Name: airports airport_id; Type: DEFAULT; Schema: public; Owner: admin_user
--

ALTER TABLE ONLY public.airports ALTER COLUMN airport_id SET DEFAULT nextval('public.airports_airport_id_seq'::regclass);


--
-- Name: bookings booking_id; Type: DEFAULT; Schema: public; Owner: admin_user
--

ALTER TABLE ONLY public.bookings ALTER COLUMN booking_id SET DEFAULT nextval('public.bookings_booking_id_seq'::regclass);


--
-- Name: flights flight_id; Type: DEFAULT; Schema: public; Owner: admin_user
--

ALTER TABLE ONLY public.flights ALTER COLUMN flight_id SET DEFAULT nextval('public.flights_flight_id_seq'::regclass);


--
-- Data for Name: airports; Type: TABLE DATA; Schema: public; Owner: admin_user
--

COPY public.airports (airport_id, code, name, city, country) FROM stdin;
1	TLV	Ben Gurion International Airport	Tel Aviv	Israel
2	JFK	John F. Kennedy International Airport	New York	USA
3	LHR	Heathrow Airport	London	UK
4	CDG	Charles de Gaulle Airport	Paris	France
5	NRT	Narita International Airport	Tokyo	Japan
6	DXB	Dubai International Airport	Dubai	UAE
7	SYD	Sydney Kingsford Smith Airport	Sydney	Australia
8	PEK	Beijing Capital International Airport	Beijing	China
9	GRU	Sao Paulo/Guarulhos International Airport	Sao Paulo	Brazil
10	FRA	Frankfurt Airport	Frankfurt	Germany
\.


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: admin_user
--

COPY public.bookings (booking_id, flight_id, full_name, personal_id, booking_date, status) FROM stdin;
1	1	John Doe	123456789	2024-12-01 10:00:00	Confirmed
2	1	Jane Smith	987654321	2024-12-02 11:00:00	Confirmed
3	2	Alice Johnson	123123123	2024-12-03 12:00:00	Confirmed
4	2	Bob Brown	321321321	2024-12-04 09:00:00	Confirmed
5	3	Charlie Black	456456456	2024-12-05 14:00:00	Confirmed
6	4	Dana White	654654654	2024-12-06 16:00:00	Confirmed
7	5	Eve Davis	789789789	2024-12-07 17:00:00	Confirmed
8	6	Frank Miller	111222333	2024-12-08 18:00:00	Confirmed
9	7	Grace Green	444555666	2024-12-09 19:00:00	Confirmed
10	8	Henry Blue	777888999	2024-12-10 20:00:00	Confirmed
\.


--
-- Data for Name: flights; Type: TABLE DATA; Schema: public; Owner: admin_user
--

COPY public.flights (flight_id, flight_number, origin_airport_id, destination_airport_id, departure_time, arrival_time, duration, price, available_seats, created_at) FROM stdin;
1	EL101	1	2	2024-12-15 08:00:00	2024-12-15 13:00:00	05:00:00	500.00	150	2024-11-12 09:54:10.206389
2	EL102	2	1	2024-12-15 16:00:00	2024-12-16 09:00:00	17:00:00	490.00	150	2024-11-12 09:54:10.206389
3	BA303	3	4	2024-12-15 12:00:00	2024-12-15 15:00:00	03:00:00	300.00	120	2024-11-12 09:54:10.206389
4	AF404	4	5	2024-12-15 22:00:00	2024-12-16 08:00:00	10:00:00	550.00	150	2024-11-12 09:54:10.206389
5	JL505	5	6	2024-12-16 10:00:00	2024-12-16 19:00:00	09:00:00	700.00	180	2024-11-12 09:54:10.206389
6	EK606	6	7	2024-12-16 02:00:00	2024-12-16 13:00:00	11:00:00	600.00	160	2024-11-12 09:54:10.206389
7	QF707	7	8	2024-12-16 15:00:00	2024-12-16 21:00:00	06:00:00	650.00	140	2024-11-12 09:54:10.206389
8	CA808	8	9	2024-12-17 06:00:00	2024-12-17 15:00:00	09:00:00	720.00	130	2024-11-12 09:54:10.206389
9	LA909	9	10	2024-12-17 08:00:00	2024-12-17 20:00:00	12:00:00	780.00	200	2024-11-12 09:54:10.206389
10	LH1010	10	3	2024-12-17 18:00:00	2024-12-17 23:00:00	05:00:00	450.00	170	2024-11-12 09:54:10.206389
11	EL111	1	4	2024-12-18 09:00:00	2024-12-18 14:00:00	05:00:00	500.00	150	2024-11-12 09:54:10.206389
12	BA213	2	5	2024-12-18 19:00:00	2024-12-19 08:00:00	13:00:00	520.00	160	2024-11-12 09:54:10.206389
13	AF301	3	6	2024-12-18 15:00:00	2024-12-19 04:00:00	13:00:00	600.00	150	2024-11-12 09:54:10.206389
14	JL202	4	7	2024-12-18 06:00:00	2024-12-18 18:00:00	12:00:00	750.00	140	2024-11-12 09:54:10.206389
15	EK303	5	8	2024-12-18 17:00:00	2024-12-19 08:00:00	15:00:00	800.00	150	2024-11-12 09:54:10.206389
16	QF404	6	9	2024-12-19 05:00:00	2024-12-19 15:00:00	10:00:00	680.00	160	2024-11-12 09:54:10.206389
17	CA505	7	10	2024-12-19 13:00:00	2024-12-19 23:00:00	10:00:00	750.00	130	2024-11-12 09:54:10.206389
18	LA606	8	1	2024-12-19 20:00:00	2024-12-20 05:00:00	09:00:00	620.00	140	2024-11-12 09:54:10.206389
19	LH707	9	2	2024-12-20 03:00:00	2024-12-20 17:00:00	14:00:00	560.00	190	2024-11-12 09:54:10.206389
20	EL808	10	5	2024-12-20 12:00:00	2024-12-20 21:00:00	09:00:00	470.00	170	2024-11-12 09:54:10.206389
\.


--
-- Name: airports_airport_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin_user
--

SELECT pg_catalog.setval('public.airports_airport_id_seq', 10, true);


--
-- Name: bookings_booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin_user
--

SELECT pg_catalog.setval('public.bookings_booking_id_seq', 10, true);


--
-- Name: flights_flight_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin_user
--

SELECT pg_catalog.setval('public.flights_flight_id_seq', 20, true);


--
-- Name: airports airports_code_key; Type: CONSTRAINT; Schema: public; Owner: admin_user
--

ALTER TABLE ONLY public.airports
    ADD CONSTRAINT airports_code_key UNIQUE (code);


--
-- Name: airports airports_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_user
--

ALTER TABLE ONLY public.airports
    ADD CONSTRAINT airports_pkey PRIMARY KEY (airport_id);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_user
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (booking_id);


--
-- Name: flights flights_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_user
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT flights_pkey PRIMARY KEY (flight_id);


--
-- Name: idx_airport_code; Type: INDEX; Schema: public; Owner: admin_user
--

CREATE INDEX idx_airport_code ON public.airports USING btree (code);


--
-- Name: idx_booking_flight_id; Type: INDEX; Schema: public; Owner: admin_user
--

CREATE INDEX idx_booking_flight_id ON public.bookings USING btree (flight_id);


--
-- Name: idx_flight_number; Type: INDEX; Schema: public; Owner: admin_user
--

CREATE INDEX idx_flight_number ON public.flights USING btree (flight_number);


--
-- Name: bookings bookings_flight_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_user
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_flight_id_fkey FOREIGN KEY (flight_id) REFERENCES public.flights(flight_id) ON DELETE CASCADE;


--
-- Name: flights flights_destination_airport_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_user
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT flights_destination_airport_id_fkey FOREIGN KEY (destination_airport_id) REFERENCES public.airports(airport_id) ON DELETE CASCADE;


--
-- Name: flights flights_origin_airport_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_user
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT flights_origin_airport_id_fkey FOREIGN KEY (origin_airport_id) REFERENCES public.airports(airport_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

