-- Demo gate staff, so anyone who clones the project can try the ticket scan.
-- Log in as staff@matchday.local / staff-password. The password is public on purpose:
-- this is demo data, like the venues and matches in ticket-service.
-- {bcrypt} tells Spring's DelegatingPasswordEncoder which algorithm made the hash.
INSERT INTO users (id, email, password_hash, display_name)
VALUES ('00000000-0000-0000-0000-00000000a001',
        'staff@matchday.local',
        '{bcrypt}$2a$10$OywL/TEmNsOkg9vaEjNY2uQpe3rulHjsKoxWIqQFFn8so53pKcsuG',
        'Gate staff');

INSERT INTO user_roles (user_id, role)
VALUES ('00000000-0000-0000-0000-00000000a001', 'ROLE_USER'),
       ('00000000-0000-0000-0000-00000000a001', 'ROLE_ADMIN');
