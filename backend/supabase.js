const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://jkboqwizagfjykeokqyl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprYm9xd2l6YWdmanlrZW9rcXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MTM3MjAsImV4cCI6MjAyOTk4OTcyMH0.zyifY_zeX6s7yDj0FjoJFeb8nyMKKA4tr0vN4kEithY';
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
