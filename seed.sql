-- Demo data seed
insert into accounts (name) values ('Demo Srl') returning id;
-- Use the returned id to set account_id below manually if needed.

-- Example transactions (replace account_id with actual UUID)
-- insert into transactions (account_id, date, type, amount, source, note) values
-- ('<ACCOUNT_UUID>', '2025-08-01','revenue',450,'POS',''),
-- ('<ACCOUNT_UUID>', '2025-08-01','cogs',200,'',''),
-- ('<ACCOUNT_UUID>', '2025-08-01','opex',150,'','');
