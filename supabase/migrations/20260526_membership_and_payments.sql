alter table public.profiles
add column if not exists membership_tier text default 'discover'
check (membership_tier in ('discover', 'connect', 'belong'));

update public.profiles
set membership_tier = 'discover'
where membership_tier is null;

alter table public.event_rsvps
add column if not exists payment_status text default 'not_required'
check (payment_status in ('not_required', 'unpaid', 'paid'));

alter table public.event_rsvps
add column if not exists paid_at timestamptz;

alter table public.event_rsvps
add column if not exists paid_amount double precision default 0
check (paid_amount >= 0);

alter table public.event_rsvps
add column if not exists payment_confirmed_by uuid references public.profiles(id);

update public.event_rsvps as rsvp
set payment_status = case
  when coalesce(event.entry_fee, 0) > 0 then 'unpaid'
  else 'not_required'
end
from public.events as event
where event.id = rsvp.event_id
  and rsvp.status = 'approved'
  and rsvp.payment_status is null;
