-- Enable Row Level Security on all tables for enhanced security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_invites ENABLE ROW LEVEL SECURITY;

-- Create policy for super_admin to access all data
DROP POLICY IF EXISTS "Super admin access" ON users;
CREATE POLICY "Super admin access" ON users
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'super_admin'
    )
  );

DROP POLICY IF EXISTS "Super admin access" ON organizations;
CREATE POLICY "Super admin access" ON organizations
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'super_admin'
    )
  );

DROP POLICY IF EXISTS "Super admin access" ON organization_invites;
CREATE POLICY "Super admin access" ON organization_invites
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'super_admin'
    )
  );

-- Create policy for organization members to access their own organization data
DROP POLICY IF EXISTS "Organization members access" ON users;
CREATE POLICY "Organization members access" ON users
  USING (
    organization_id = (
      SELECT organization_id FROM users WHERE id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Organization members access" ON organizations;
CREATE POLICY "Organization members access" ON organizations
  USING (
    id = (
      SELECT organization_id FROM users WHERE id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Organization members access" ON organization_invites;
CREATE POLICY "Organization members access" ON organization_invites
  USING (
    organization_id = (
      SELECT organization_id FROM users WHERE id = auth.uid()
    )
  );

-- Add last_sign_in column to track login activity
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_sign_in TIMESTAMP WITH TIME ZONE;

-- Create function to update last_sign_in timestamp
CREATE OR REPLACE FUNCTION update_last_sign_in()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users SET last_sign_in = NOW() WHERE id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update last_sign_in on authentication
DROP TRIGGER IF EXISTS on_auth_sign_in ON auth.sessions;
CREATE TRIGGER on_auth_sign_in
  AFTER INSERT ON auth.sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_last_sign_in();
