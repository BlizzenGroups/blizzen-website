import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';

const testEndpoints = async () => {
  console.log('🧪 Testing API Endpoints...\n');

  try {
    // Test Home Content GET
    console.log('1. Testing GET /api/home-content');
    const homeContentResponse = await axios.get(`${API_BASE_URL}/api/home-content`);
    console.log('✅ Home content fetched successfully');
    console.log(`   Hero Title: ${homeContentResponse.data.data.heroTitle}`);
    console.log(`   Stats Count: ${homeContentResponse.data.data.stats?.length || 0}`);
    console.log(`   Testimonials Count: ${homeContentResponse.data.data.testimonials?.length || 0}\n`);

    // Test Placement Stats GET
    console.log('2. Testing GET /api/placement-stats');
    const placementStatsResponse = await axios.get(`${API_BASE_URL}/api/placement-stats`);
    console.log('✅ Placement stats fetched successfully');
    console.log(`   Total Placements: ${placementStatsResponse.data.data.totalPlacements}`);
    console.log(`   Placement Rate: ${placementStatsResponse.data.data.placementRate}`);
    console.log(`   Average Salary: ${placementStatsResponse.data.data.averageSalary}\n`);

    // Test Home Content POST (Update)
    console.log('3. Testing POST /api/home-content (Update)');
    const updateHomeData = {
      heroTitle: "Test Updated Title",
      heroDescription: "Test updated description",
      stats: [
        { label: "Test Stat", value: "100+" }
      ],
      testimonials: [
        {
          name: "Test User",
          role: "Test Role",
          message: "Test message"
        }
      ],
      callToAction: {
        title: "Test CTA",
        description: "Test CTA description",
        buttonText: "Test Button"
      }
    };

    const updateHomeResponse = await axios.post(`${API_BASE_URL}/api/home-content`, updateHomeData);
    console.log('✅ Home content updated successfully');
    console.log(`   Updated Title: ${updateHomeResponse.data.data.heroTitle}\n`);

    // Test Placement Stats POST (Update)
    console.log('4. Testing POST /api/placement-stats (Update)');
    const updateStatsData = {
      totalPlacements: "999+",
      placementRate: "99%",
      averageSalary: "₹10 LPA",
      highestSalary: "₹50 LPA",
      companiesPartnered: "100+",
      topCompanies: "Test Company 1, Test Company 2"
    };

    const updateStatsResponse = await axios.post(`${API_BASE_URL}/api/placement-stats`, updateStatsData);
    console.log('✅ Placement stats updated successfully');
    console.log(`   Updated Total Placements: ${updateStatsResponse.data.data.totalPlacements}\n`);

    console.log('🎉 All endpoints are working correctly!');

  } catch (error) {
    console.error('❌ Error testing endpoints:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
};

// Run the test
testEndpoints();