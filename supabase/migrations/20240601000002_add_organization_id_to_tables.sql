-- Add organization_id to all relevant tables

-- Create a function to check if a column exists
CREATE OR REPLACE FUNCTION column_exists(tbl text, col text) RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = tbl 
    AND column_name = col
  );
END;
$$ LANGUAGE plpgsql;

-- Add organization_id to employees table if it exists
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'employees') THEN
    IF NOT column_exists('employees', 'organization_id') THEN
      ALTER TABLE employees ADD COLUMN organization_id UUID REFERENCES organizations(id);
      
      -- Create policy for employees
      ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
      
      DROP POLICY IF EXISTS "Users can view employees from their organization" ON employees;
      CREATE POLICY "Users can view employees from their organization" 
        ON employees FOR SELECT 
        USING (auth.uid() IN (SELECT id FROM users WHERE organization_id = employees.organization_id));
      
      DROP POLICY IF EXISTS "Organization admins and managers can manage employees" ON employees;
      CREATE POLICY "Organization admins and managers can manage employees" 
        ON employees FOR ALL 
        USING (auth.uid() IN (SELECT id FROM users WHERE organization_id = employees.organization_id AND role IN ('org_admin', 'manager')));
    END IF;
  END IF;
END $$;

-- Add organization_id to attendance table if it exists
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'attendance') THEN
    IF NOT column_exists('attendance', 'organization_id') THEN
      ALTER TABLE attendance ADD COLUMN organization_id UUID REFERENCES organizations(id);
      
      -- Create policy for attendance
      ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
      
      DROP POLICY IF EXISTS "Users can view attendance from their organization" ON attendance;
      CREATE POLICY "Users can view attendance from their organization" 
        ON attendance FOR SELECT 
        USING (auth.uid() IN (SELECT id FROM users WHERE organization_id = attendance.organization_id));
      
      DROP POLICY IF EXISTS "Organization admins and managers can manage attendance" ON attendance;
      CREATE POLICY "Organization admins and managers can manage attendance" 
        ON attendance FOR ALL 
        USING (auth.uid() IN (SELECT id FROM users WHERE organization_id = attendance.organization_id AND role IN ('org_admin', 'manager')));
    END IF;
  END IF;
END $$;

-- Add organization_id to leaves table if it exists
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'leaves') THEN
    IF NOT column_exists('leaves', 'organization_id') THEN
      ALTER TABLE leaves ADD COLUMN organization_id UUID REFERENCES organizations(id);
      
      -- Create policy for leaves
      ALTER TABLE leaves ENABLE ROW LEVEL SECURITY;
      
      DROP POLICY IF EXISTS "Users can view leaves from their organization" ON leaves;
      CREATE POLICY "Users can view leaves from their organization" 
        ON leaves FOR SELECT 
        USING (auth.uid() IN (SELECT id FROM users WHERE organization_id = leaves.organization_id));
      
      DROP POLICY IF EXISTS "Organization admins and managers can manage leaves" ON leaves;
      CREATE POLICY "Organization admins and managers can manage leaves" 
        ON leaves FOR ALL 
        USING (auth.uid() IN (SELECT id FROM users WHERE organization_id = leaves.organization_id AND role IN ('org_admin', 'manager')));
    END IF;
  END IF;
END $$;

-- Add organization_id to resignations table if it exists
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'resignations') THEN
    IF NOT column_exists('resignations', 'organization_id') THEN
      ALTER TABLE resignations ADD COLUMN organization_id UUID REFERENCES organizations(id);
      
      -- Create policy for resignations
      ALTER TABLE resignations ENABLE ROW LEVEL SECURITY;
      
      DROP POLICY IF EXISTS "Users can view resignations from their organization" ON resignations;
      CREATE POLICY "Users can view resignations from their organization" 
        ON resignations FOR SELECT 
        USING (auth.uid() IN (SELECT id FROM users WHERE organization_id = resignations.organization_id));
      
      DROP POLICY IF EXISTS "Organization admins and managers can manage resignations" ON resignations;
      CREATE POLICY "Organization admins and managers can manage resignations" 
        ON resignations FOR ALL 
        USING (auth.uid() IN (SELECT id FROM users WHERE organization_id = resignations.organization_id AND role IN ('org_admin', 'manager')));
    END IF;
  END IF;
END $$;
