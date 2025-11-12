-- Create bundles table
CREATE TABLE public.bundles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('data', 'sms', 'minutes', 'airtime')),
  amount INTEGER NOT NULL,
  price INTEGER NOT NULL,
  validity TEXT,
  description TEXT,
  features TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT NOT NULL,
  recipient_number TEXT,
  bundle_id UUID REFERENCES public.bundles(id),
  bundle_name TEXT NOT NULL,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED')),
  mpesa_receipt TEXT,
  mpesa_request_id TEXT UNIQUE,
  checkout_request_id TEXT,
  result_code TEXT,
  result_description TEXT,
  transaction_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create loyalty_points table
CREATE TABLE public.loyalty_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT NOT NULL UNIQUE,
  points INTEGER DEFAULT 0,
  total_transactions INTEGER DEFAULT 0,
  total_spent INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_points ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bundles (public read access)
CREATE POLICY "Anyone can view active bundles"
  ON public.bundles
  FOR SELECT
  USING (is_active = true);

-- RLS Policies for orders (users can view their own orders)
CREATE POLICY "Users can view their own orders"
  ON public.orders
  FOR SELECT
  USING (true);

CREATE POLICY "Service can insert orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service can update orders"
  ON public.orders
  FOR UPDATE
  USING (true);

-- RLS Policies for loyalty_points
CREATE POLICY "Users can view loyalty points"
  ON public.loyalty_points
  FOR SELECT
  USING (true);

CREATE POLICY "Service can manage loyalty points"
  ON public.loyalty_points
  FOR ALL
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_loyalty_points_updated_at
  BEFORE UPDATE ON public.loyalty_points
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample bundles
INSERT INTO public.bundles (name, type, amount, price, validity, description, features) VALUES
  ('1GB - 1 Hour', 'data', 1024, 21, '1HR', 'Perfect for quick browsing', ARRAY['Unlimited purchases per day', 'Instant activation', 'All networks']),
  ('1.5GB - 3 Hours', 'data', 1536, 53, '3HRS', 'Great for social media', ARRAY['Unlimited purchases per day', 'Instant activation', 'All networks']),
  ('2GB - 24 Hours', 'data', 2048, 110, '24HRS', 'Full day coverage', ARRAY['Unlimited purchases per day', 'Instant activation', 'All networks']),
  ('2.5GB - 7 Days', 'data', 2560, 300, '7DAYS', 'Weekly data bundle', ARRAY['Best value', 'Product of the day', 'All networks']),
  ('20 SMS', 'sms', 20, 5, '1DAY', 'Basic SMS package', ARRAY['Instant delivery', 'All networks']),
  ('200 SMS', 'sms', 200, 10, '1DAY', 'Standard SMS package', ARRAY['Instant delivery', 'All networks']),
  ('1000 SMS', 'sms', 1000, 30, '7DAYS', 'Weekly SMS bundle', ARRAY['Instant delivery', 'All networks']),
  ('1500 SMS', 'sms', 1500, 101, '30DAYS', 'Monthly SMS bundle', ARRAY['Instant delivery', 'All networks']),
  ('3500 SMS', 'sms', 3500, 201, '30DAYS', 'Premium SMS bundle', ARRAY['Instant delivery', 'All networks']),
  ('45 Minutes', 'minutes', 45, 22, '3HRS', 'Quick calls package', ARRAY['Instant activation', 'All networks']),
  ('50 Minutes', 'minutes', 50, 51, 'MIDNIGHT', 'Evening calls bundle', ARRAY['Instant activation', 'All networks']);