-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table with organization reference
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  organization_id UUID REFERENCES organizations(id),
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'org_admin', 'manager', 'employee')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create organization_invites table
CREATE TABLE IF NOT EXISTS organization_invites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('org_admin', 'manager', 'employee')),
  invited_by UUID REFERENCES users(id) NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(organization_id, email)
);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_invites ENABLE ROW LEVEL SECURITY;

-- Create policies for organizations
CREATE POLICY "Super admins can do anything with organizations"
  ON organizations
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'super_admin'));

CREATE POLICY "Organization admins can view their own organization"
  ON organizations
  FOR SELECT
  USING (auth.uid() IN (SELECT id FROM users WHERE organization_id = organizations.id AND role = 'org_admin'));

-- Create policies for users
CREATE POLICY "Super admins can do anything with users"
  ON users
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'super_admin'));

CREATE POLICY "Organization admins can view and edit users in their organization"
  ON users
  USING (auth.uid() IN (SELECT id FROM users WHERE organization_id = users.organization_id AND role = 'org_admin'));

CREATE POLICY "Users can view their own record"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Create policies for organization_invites
CREATE POLICY "Super admins can do anything with invites"
  ON organization_invites
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'super_admin'));

CREATE POLICY "Organization admins can manage invites for their organization"
  ON organization_invites
  USING (auth.uid() IN (SELECT id FROM users WHERE organization_id = organization_invites.organization_id AND role = 'org_admin'));

-- Add realtime support
alter publication supabase_realtime add table organizations;
alter publication supabase_realtime add table users;
alter publication supabase_realtime add table organization_invites;
