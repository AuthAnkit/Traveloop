-- ================================================================
-- Traveloop India Seed Data
-- Run this in your PostgreSQL traveloop database
-- ================================================================

INSERT INTO cities (name, country, country_code, latitude, longitude, cost_index, image_url, popularity_score) VALUES
-- Metro Cities
('Mumbai',       'India', 'IN', 19.0760, 72.8777,  3500, NULL, 9.8),
('Delhi',        'India', 'IN', 28.6139, 77.2090,  3000, NULL, 9.7),
('Bengaluru',    'India', 'IN', 12.9716, 77.5946,  3200, NULL, 9.2),
('Chennai',      'India', 'IN', 13.0827, 80.2707,  2800, NULL, 8.8),
('Hyderabad',    'India', 'IN', 17.3850, 78.4867,  2900, NULL, 8.9),
('Kolkata',      'India', 'IN', 22.5726, 88.3639,  2500, NULL, 8.7),
('Pune',         'India', 'IN', 18.5204, 73.8567,  2800, NULL, 8.5),
('Ahmedabad',    'India', 'IN', 23.0225, 72.5714,  2200, NULL, 8.3),
-- Heritage & Culture
('Agra',         'India', 'IN', 27.1767, 78.0081,  1800, NULL, 9.6),
('Jaipur',       'India', 'IN', 26.9124, 75.7873,  2000, NULL, 9.5),
('Varanasi',     'India', 'IN', 25.3176, 82.9739,  1500, NULL, 9.4),
('Hampi',        'India', 'IN', 15.3350, 76.4600,  1200, NULL, 8.8),
('Khajuraho',    'India', 'IN', 24.8318, 79.9199,  1300, NULL, 8.2),
('Mysuru',       'India', 'IN', 12.2958, 76.6394,  1600, NULL, 8.6),
('Udaipur',      'India', 'IN', 24.5854, 73.7125,  2200, NULL, 9.3),
('Jodhpur',      'India', 'IN', 26.2389, 73.0243,  1800, NULL, 9.0),
('Jaisalmer',    'India', 'IN', 26.9157, 70.9083,  1600, NULL, 8.9),
('Pushkar',      'India', 'IN', 26.4892, 74.5513,  1200, NULL, 8.4),
('Mathura',      'India', 'IN', 27.5000, 77.6700,  1100, NULL, 8.0),
('Vrindavan',    'India', 'IN', 27.5800, 77.7000,  1000, NULL, 7.9),
-- Hill Stations
('Shimla',       'India', 'IN', 31.1048, 77.1734,  2200, NULL, 9.1),
('Manali',       'India', 'IN', 32.2432, 77.1892,  2500, NULL, 9.4),
('Darjeeling',   'India', 'IN', 27.0360, 88.2627,  2000, NULL, 9.0),
('Ooty',         'India', 'IN', 11.4102, 76.6950,  1800, NULL, 8.7),
('Munnar',       'India', 'IN', 10.0889, 77.0595,  2000, NULL, 9.1),
('Mussoorie',    'India', 'IN', 30.4598, 78.0664,  2200, NULL, 8.8),
('Nainital',     'India', 'IN', 29.3803, 79.4636,  2000, NULL, 8.6),
('Coorg',        'India', 'IN', 12.3375, 75.8069,  2200, NULL, 8.9),
('Mahabaleshwar','India', 'IN', 17.9236, 73.6570,  2000, NULL, 8.3),
-- Beaches & Coastal
('Panaji',       'India', 'IN', 15.4909, 73.8278,  2800, NULL, 9.5),
('Kochi',        'India', 'IN', 9.9312,  76.2673,  2200, NULL, 9.0),
('Pondicherry',  'India', 'IN', 11.9416, 79.8083,  1800, NULL, 8.8),
('Port Blair',   'India', 'IN', 11.6234, 92.7265,  2500, NULL, 8.9),
('Varkala',      'India', 'IN', 8.7337,  76.7150,  1600, NULL, 8.4),
('Vizag',        'India', 'IN', 17.6868, 83.2185,  2200, NULL, 8.5),
('Alibaug',      'India', 'IN', 18.6414, 72.8722,  2000, NULL, 7.8),
-- Spiritual
('Rishikesh',    'India', 'IN', 30.0869, 78.2676,  1500, NULL, 9.2),
('Haridwar',     'India', 'IN', 29.9457, 78.1642,  1200, NULL, 8.8),
('Tirupati',     'India', 'IN', 13.6288, 79.4192,  1400, NULL, 8.9),
('Amritsar',     'India', 'IN', 31.6340, 74.8723,  1600, NULL, 9.3),
('Shirdi',       'India', 'IN', 19.7661, 74.4764,  1200, NULL, 8.6),
('Bodh Gaya',    'India', 'IN', 24.6961, 84.9913,  1100, NULL, 8.5),
-- Adventure & Offbeat
('Leh',          'India', 'IN', 34.1526, 77.5771,  2800, NULL, 9.6),
('Spiti',        'India', 'IN', 32.2461, 78.0338,  2000, NULL, 8.7),
('Shillong',     'India', 'IN', 25.5788, 91.8933,  1800, NULL, 8.5),
('Gangtok',      'India', 'IN', 27.3389, 88.6065,  2200, NULL, 8.8),
('Kaziranga',    'India', 'IN', 26.5775, 93.1714,  2000, NULL, 8.4),
('Mcleod Ganj',  'India', 'IN', 32.2426, 76.3234,  1800, NULL, 8.9),
('Aurangabad',   'India', 'IN', 19.8762, 75.3433,  1600, NULL, 8.3),
('Bhopal',       'India', 'IN', 23.2599, 77.4126,  1800, NULL, 7.9),
('Ranthambore',  'India', 'IN', 26.0173, 76.5026,  2500, NULL, 8.8),
('Jim Corbett',  'India', 'IN', 29.5300, 78.7747,  2500, NULL, 8.6);

-- ================================================================
-- Activities for key cities
-- ================================================================

-- AGRA
INSERT INTO activities (city_id, title, description, category, estimated_cost, duration_hours, rating, image_url)
SELECT id, 'Taj Mahal Visit', 'Witness the wonder of the world at sunrise. Entry includes main mausoleum.', 'Sightseeing', 1300, 3.0, 4.9, NULL FROM cities WHERE name='Agra' AND country='India'
UNION ALL SELECT id, 'Agra Fort Tour', 'UNESCO heritage fort with stunning Yamuna views and Mughal architecture.', 'Sightseeing', 650, 2.5, 4.7, NULL FROM cities WHERE name='Agra' AND country='India'
UNION ALL SELECT id, 'Mehtab Bagh Sunset', 'Gardens across Yamuna offering perfect sunset view of the Taj Mahal.', 'Nature', 300, 1.5, 4.8, NULL FROM cities WHERE name='Agra' AND country='India'
UNION ALL SELECT id, 'Petha & Street Food Walk', 'Try famous Agra Petha, chaat and kachori in the old city lanes.', 'Food', 300, 2.0, 4.5, NULL FROM cities WHERE name='Agra' AND country='India';

-- JAIPUR
INSERT INTO activities (city_id, title, description, category, estimated_cost, duration_hours, rating, image_url)
SELECT id, 'Amber Fort & Elephant Ride', 'Majestic hilltop fort with elephant ride and stunning mirror palace.', 'Sightseeing', 1100, 3.5, 4.8, NULL FROM cities WHERE name='Jaipur' AND country='India'
UNION ALL SELECT id, 'Hawa Mahal', 'Iconic "Palace of Winds" — photograph from outside or explore 5 floors.', 'Sightseeing', 200, 1.5, 4.7, NULL FROM cities WHERE name='Jaipur' AND country='India'
UNION ALL SELECT id, 'City Palace Museum', 'Royal residence turned museum with royal art, textiles and weapons.', 'Culture', 700, 2.0, 4.6, NULL FROM cities WHERE name='Jaipur' AND country='India'
UNION ALL SELECT id, 'Rajasthani Thali Dinner', 'Unlimited traditional Rajasthani meal — dal baati churma, gatte ki sabzi.', 'Food', 500, 1.5, 4.8, NULL FROM cities WHERE name='Jaipur' AND country='India'
UNION ALL SELECT id, 'Johari Bazaar Shopping', 'Shop for Jaipuri quilts, blue pottery, lac bangles and gemstones.', 'Shopping', 2000, 2.5, 4.5, NULL FROM cities WHERE name='Jaipur' AND country='India'
UNION ALL SELECT id, 'Hot Air Balloon Ride', 'Sunrise balloon ride over Amber Fort and Jaipur skyline.', 'Adventure', 9000, 1.5, 4.9, NULL FROM cities WHERE name='Jaipur' AND country='India';

-- GOA (PANAJI)
INSERT INTO activities (city_id, title, description, category, estimated_cost, duration_hours, rating, image_url)
SELECT id, 'Baga Beach Day', 'Relax on Baga beach, try water sports — parasailing, banana boat rides.', 'Adventure', 1500, 5.0, 4.7, NULL FROM cities WHERE name='Panaji' AND country='India'
UNION ALL SELECT id, 'Old Goa Churches Tour', 'UNESCO-listed Basilica of Bom Jesus and Se Cathedral — Portuguese heritage.', 'Culture', 0, 2.5, 4.8, NULL FROM cities WHERE name='Panaji' AND country='India'
UNION ALL SELECT id, 'Dudhsagar Waterfall Trek', 'Spectacular 310m waterfall trek through the Western Ghats jungle.', 'Adventure', 800, 8.0, 4.9, NULL FROM cities WHERE name='Panaji' AND country='India'
UNION ALL SELECT id, 'Goa Seafood Dinner', 'Fresh catch — prawn curry, lobster, pomfret at a beachside shack.', 'Food', 1200, 1.5, 4.8, NULL FROM cities WHERE name='Panaji' AND country='India'
UNION ALL SELECT id, 'Saturday Night Market (Arpora)', 'Vibrant flea market with food stalls, live music, handicrafts and more.', 'Shopping', 500, 3.0, 4.6, NULL FROM cities WHERE name='Panaji' AND country='India';

-- VARANASI
INSERT INTO activities (city_id, title, description, category, estimated_cost, duration_hours, rating, image_url)
SELECT id, 'Ganga Aarti at Dashashwamedh Ghat', 'Mesmerizing evening fire ceremony on the banks of the Ganges.', 'Culture', 0, 1.5, 5.0, NULL FROM cities WHERE name='Varanasi' AND country='India'
UNION ALL SELECT id, 'Sunrise Boat Ride on Ganges', 'Early morning boat ride past ancient ghats and cremation sites.', 'Sightseeing', 700, 2.0, 4.9, NULL FROM cities WHERE name='Varanasi' AND country='India'
UNION ALL SELECT id, 'Kashi Vishwanath Temple', 'One of the 12 Jyotirlingas — most sacred Shiva temple in India.', 'Sightseeing', 0, 2.0, 4.8, NULL FROM cities WHERE name='Varanasi' AND country='India'
UNION ALL SELECT id, 'Banarasi Silk Shopping', 'Buy authentic handwoven Banarasi silk sarees from weavers in Varanasi.', 'Shopping', 3000, 2.5, 4.6, NULL FROM cities WHERE name='Varanasi' AND country='India'
UNION ALL SELECT id, 'Street Food Trail', 'Try kachori-sabzi, malaiyo, baati chokha and Banarasi paan.', 'Food', 400, 2.0, 4.7, NULL FROM cities WHERE name='Varanasi' AND country='India';

-- MANALI
INSERT INTO activities (city_id, title, description, category, estimated_cost, duration_hours, rating, image_url)
SELECT id, 'Rohtang Pass Excursion', 'Snow-capped mountain pass at 3978m — snowfall even in summer months.', 'Adventure', 2500, 8.0, 4.8, NULL FROM cities WHERE name='Manali' AND country='India'
UNION ALL SELECT id, 'River Rafting on Beas', 'Grade III-IV rapids on the Beas River through pine-forested valleys.', 'Adventure', 1500, 3.0, 4.7, NULL FROM cities WHERE name='Manali' AND country='India'
UNION ALL SELECT id, 'Solang Valley Cable Car', 'Panoramic gondola ride over Solang Valley with snow & glacier views.', 'Adventure', 500, 2.0, 4.6, NULL FROM cities WHERE name='Manali' AND country='India'
UNION ALL SELECT id, 'Old Manali Village Walk', 'Explore Hadimba temple, apple orchards and Tibetan monasteries.', 'Sightseeing', 200, 3.0, 4.7, NULL FROM cities WHERE name='Manali' AND country='India'
UNION ALL SELECT id, 'Paragliding at Solang', 'Tandem paragliding over the Kullu-Manali valley — unforgettable views.', 'Adventure', 2500, 1.0, 4.9, NULL FROM cities WHERE name='Manali' AND country='India';

-- MUMBAI
INSERT INTO activities (city_id, title, description, category, estimated_cost, duration_hours, rating, image_url)
SELECT id, 'Gateway of India & Boat Ride', 'Iconic arch monument on Colaba waterfront with ferry to Elephanta Caves.', 'Sightseeing', 200, 2.0, 4.7, NULL FROM cities WHERE name='Mumbai' AND country='India'
UNION ALL SELECT id, 'Elephanta Caves UNESCO Tour', 'Ancient rock-cut Shiva temples on Elephanta Island via ferry.', 'Culture', 650, 4.0, 4.8, NULL FROM cities WHERE name='Mumbai' AND country='India'
UNION ALL SELECT id, 'Colaba Causeway Shopping', 'Bargain for clothes, antiques, street food and souvenirs.', 'Shopping', 1500, 2.0, 4.5, NULL FROM cities WHERE name='Mumbai' AND country='India'
UNION ALL SELECT id, 'Vada Pav & Pav Bhaji Trail', 'Mumbai''s iconic street foods — vada pav from Anand Stall, pav bhaji at Juhu.', 'Food', 300, 2.0, 4.9, NULL FROM cities WHERE name='Mumbai' AND country='India'
UNION ALL SELECT id, 'Marine Drive Sunset Stroll', 'Walk the famous "Queen''s Necklace" promenade at sunset.', 'Sightseeing', 0, 1.5, 4.8, NULL FROM cities WHERE name='Mumbai' AND country='India'
UNION ALL SELECT id, 'Dharavi Slum & Heritage Walk', 'Insightful walking tour of Asia''s largest informal settlement.', 'Culture', 700, 2.5, 4.6, NULL FROM cities WHERE name='Mumbai' AND country='India';

-- DELHI
INSERT INTO activities (city_id, title, description, category, estimated_cost, duration_hours, rating, image_url)
SELECT id, 'Red Fort (Lal Qila)', 'Mughal emperor''s palace complex — light & sound show in evenings.', 'Sightseeing', 600, 2.5, 4.7, NULL FROM cities WHERE name='Delhi' AND country='India'
UNION ALL SELECT id, 'Qutub Minar Complex', 'World''s tallest brick minaret and UNESCO heritage site.', 'Sightseeing', 600, 2.0, 4.8, NULL FROM cities WHERE name='Delhi' AND country='India'
UNION ALL SELECT id, 'India Gate & Rashtrapati Bhavan', 'War memorial + President''s house — best seen in the evening.', 'Sightseeing', 0, 2.0, 4.6, NULL FROM cities WHERE name='Delhi' AND country='India'
UNION ALL SELECT id, 'Chandni Chowk Food Walk', 'Parantha wali gali, jalebi from Old Famous, and Delhi''s best chaat.', 'Food', 500, 2.5, 4.9, NULL FROM cities WHERE name='Delhi' AND country='India'
UNION ALL SELECT id, 'Humayun''s Tomb', 'The architectural precursor to the Taj Mahal — stunning Mughal gardens.', 'Sightseeing', 600, 2.0, 4.8, NULL FROM cities WHERE name='Delhi' AND country='India'
UNION ALL SELECT id, 'Lotus Temple Visit', 'Stunning white marble Bahá''í temple — open to all faiths for meditation.', 'Sightseeing', 0, 1.5, 4.7, NULL FROM cities WHERE name='Delhi' AND country='India';

-- RISHIKESH
INSERT INTO activities (city_id, title, description, category, estimated_cost, duration_hours, rating, image_url)
SELECT id, 'White Water Rafting (Grade III-IV)', 'Best rafting in India on the Ganges from Shivpuri to Rishikesh (16km).', 'Adventure', 700, 4.0, 4.9, NULL FROM cities WHERE name='Rishikesh' AND country='India'
UNION ALL SELECT id, 'Yoga & Meditation Retreat', 'Join morning yoga class at an ashram on the Ganges banks.', 'Culture', 500, 2.5, 4.8, NULL FROM cities WHERE name='Rishikesh' AND country='India'
UNION ALL SELECT id, 'Laxman Jhula & Ram Jhula', 'Iconic suspension bridges over the Ganges — temple hopping and chai.', 'Sightseeing', 0, 2.0, 4.7, NULL FROM cities WHERE name='Rishikesh' AND country='India'
UNION ALL SELECT id, 'Bungee Jumping', 'India''s highest fixed platform bungee at 83m. Thrilling!', 'Adventure', 3550, 1.0, 4.9, NULL FROM cities WHERE name='Rishikesh' AND country='India'
UNION ALL SELECT id, 'Ganga Aarti at Triveni Ghat', 'Evening fire ritual on the banks of the sacred Ganges.', 'Culture', 0, 1.0, 4.9, NULL FROM cities WHERE name='Rishikesh' AND country='India';

-- AMRITSAR
INSERT INTO activities (city_id, title, description, category, estimated_cost, duration_hours, rating, image_url)
SELECT id, 'Golden Temple (Harmandir Sahib)', 'World''s most visited religious site. Free langar (community kitchen) served 24/7.', 'Culture', 0, 2.5, 5.0, NULL FROM cities WHERE name='Amritsar' AND country='India'
UNION ALL SELECT id, 'Wagah Border Ceremony', 'Daily flag-lowering ceremony at India-Pakistan border — patriotic & dramatic.', 'Culture', 0, 3.5, 4.9, NULL FROM cities WHERE name='Amritsar' AND country='India'
UNION ALL SELECT id, 'Jallianwala Bagh Memorial', 'Historic garden and memorial of 1919 massacre — moving and important.', 'Culture', 0, 1.5, 4.8, NULL FROM cities WHERE name='Amritsar' AND country='India'
UNION ALL SELECT id, 'Amritsari Kulcha & Lassi', 'Stuffed kulcha from Kulcha Land and thick creamy lassi — unmissable!', 'Food', 300, 1.5, 4.9, NULL FROM cities WHERE name='Amritsar' AND country='India';

-- LEH LADAKH
INSERT INTO activities (city_id, title, description, category, estimated_cost, duration_hours, rating, image_url)
SELECT id, 'Pangong Lake Day Trip', 'Iconic deep-blue high-altitude lake on the India-China border.', 'Nature', 1500, 10.0, 5.0, NULL FROM cities WHERE name='Leh' AND country='India'
UNION ALL SELECT id, 'Nubra Valley & Bactrian Camels', 'Sand dunes in Hunder, double-humped camel ride & Diskit Monastery.', 'Adventure', 1200, 9.0, 4.9, NULL FROM cities WHERE name='Leh' AND country='India'
UNION ALL SELECT id, 'Magnetic Hill Drive', 'Optical illusion road where cars appear to roll uphill. Gravity-defying!', 'Sightseeing', 0, 2.0, 4.5, NULL FROM cities WHERE name='Leh' AND country='India'
UNION ALL SELECT id, 'Thiksey & Hemis Monastery', 'Stunning hilltop monasteries with Buddha statues and Ladakhi culture.', 'Culture', 200, 3.5, 4.8, NULL FROM cities WHERE name='Leh' AND country='India'
UNION ALL SELECT id, 'River Rafting on Zanskar', 'Grade IV-V rafting on the confluence of Indus and Zanskar rivers.', 'Adventure', 1500, 4.0, 4.9, NULL FROM cities WHERE name='Leh' AND country='India';

-- KERALA (KOCHI)
INSERT INTO activities (city_id, title, description, category, estimated_cost, duration_hours, rating, image_url)
SELECT id, 'Alleppey Backwater Houseboat', 'Overnight stay on a traditional Kerala houseboat through palm-lined canals.', 'Culture', 8000, 24.0, 4.9, NULL FROM cities WHERE name='Kochi' AND country='India'
UNION ALL SELECT id, 'Kathakali Dance Performance', 'Classical Kerala dance drama with elaborate makeup and costumes.', 'Culture', 400, 2.0, 4.7, NULL FROM cities WHERE name='Kochi' AND country='India'
UNION ALL SELECT id, 'Fort Kochi Heritage Walk', 'Chinese fishing nets, Dutch palace, Jewish synagogue — colonial Kochi.', 'Sightseeing', 0, 3.0, 4.8, NULL FROM cities WHERE name='Kochi' AND country='India'
UNION ALL SELECT id, 'Kerala Sadhya Feast', 'Traditional banana-leaf meal with 24+ dishes — rasam, sambar, payasam.', 'Food', 400, 1.5, 4.9, NULL FROM cities WHERE name='Kochi' AND country='India'
UNION ALL SELECT id, 'Periyar Wildlife Safari (Thekkady)', 'Boat safari to spot elephants, bison, deer in Periyar National Park.', 'Nature', 800, 5.0, 4.7, NULL FROM cities WHERE name='Kochi' AND country='India';

-- UDAIPUR
INSERT INTO activities (city_id, title, description, category, estimated_cost, duration_hours, rating, image_url)
SELECT id, 'City Palace Complex', 'Massive lakefront palace — museum, rooftop views of Lake Pichola.', 'Sightseeing', 400, 3.0, 4.8, NULL FROM cities WHERE name='Udaipur' AND country='India'
UNION ALL SELECT id, 'Lake Pichola Boat Ride', 'Sunset cruise past the floating Lake Palace and Jag Mandir island.', 'Sightseeing', 700, 1.5, 4.9, NULL FROM cities WHERE name='Udaipur' AND country='India'
UNION ALL SELECT id, 'Sunset at Sajjangarh (Monsoon Palace)', 'Hilltop palace with panoramic views of Udaipur city at golden hour.', 'Nature', 155, 2.0, 4.8, NULL FROM cities WHERE name='Udaipur' AND country='India'
UNION ALL SELECT id, 'Dal Baati Churma Dinner', 'Authentic Rajasthani dinner at a heritage haveli with folk music.', 'Food', 700, 2.0, 4.8, NULL FROM cities WHERE name='Udaipur' AND country='India';

-- DARJEELING
INSERT INTO activities (city_id, title, description, category, estimated_cost, duration_hours, rating, image_url)
SELECT id, 'Sunrise at Tiger Hill', 'Breathtaking view of Kanchenjunga and sometimes Everest at dawn.', 'Nature', 100, 3.0, 4.9, NULL FROM cities WHERE name='Darjeeling' AND country='India'
UNION ALL SELECT id, 'Darjeeling Himalayan Railway (Toy Train)', 'UNESCO heritage toy train through tea gardens and colonial hill towns.', 'Sightseeing', 1070, 2.5, 4.8, NULL FROM cities WHERE name='Darjeeling' AND country='India'
UNION ALL SELECT id, 'Tea Garden Tour & Tasting', 'Walk through Happy Valley tea estate and taste world-famous Darjeeling tea.', 'Culture', 200, 2.5, 4.7, NULL FROM cities WHERE name='Darjeeling' AND country='India'
UNION ALL SELECT id, 'Himalayan Mountaineering Institute', 'Museum at the institute that trained Tenzing Norgay — Everest history.', 'Culture', 100, 2.0, 4.6, NULL FROM cities WHERE name='Darjeeling' AND country='India';
