export class AppConfig {
  companies = [
    { name: 'Test Company 1' },
    { name: 'Test Company 2' },
    { name: 'Test Company 3' },
    { name: 'Test Company 4' },
    { name: 'Test Company 5' },
    { name: 'Test Company 6' },
  ];
  apiEndPoint = 'http://apicheckdefense.leapinglogic.com/';
  graphClientID = '71f27613-0959-4efa-8440-9ee24211e19a';
  graphEndpoint = 'https://graph.microsoft.com/v1.0/me';
  graphScopes = ['Files.Read User.Read Mail.send'];
}
