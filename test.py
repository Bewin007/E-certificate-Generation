import requests

# Define the URL of your API endpoint
url = 'http://localhost:8000/certificates/'

# Define the data you want to send as a dictionary
data = {
    'reg_no': 'URK21cs1128',
    'name': '1122',
    'email': 'john@example.com',
    'event_name': 'test',
    'summary_event': 'Easy',
    'organization': 1,  # Assuming the organization ID is 1
}

# Create a dictionary for the file upload (replace 'file' with the actual field name)
files = {'file': open('logo.png', 'rb')}  # Replace with your file path

# Make a POST request to create the Certificate
response = requests.post(url, data=data, files=files)

# Check the response
if response.status_code == 201:  # HTTP_CREATED
    certificate_data = response.json()
    print(f'Certificate created successfully:\n{certificate_data}')
else:
    print(f'Error creating certificate. Status code: {response.status_code}')
    print(response.text)  # This will show the response content if there was an error
