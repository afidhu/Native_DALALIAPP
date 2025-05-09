import { createClient } from '@supabase/supabase-js';

// Define the Supabase URL and Key directly in this file
const supabaseUrl = 'https://qqqkhfnicebihdelsibr.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxcWtoZm5pY2ViaWhkZWxzaWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NjUwMzUsImV4cCI6MjA2MDA0MTAzNX0.rXHYH-yq1xytxQmGpveNzCmk8kArCybe4ONboFwD-HY'; // Replace with your API key



const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;