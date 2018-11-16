function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold>IFTTT Settings</Text>}>
        <Toggle
          settingsKey="toggleIFTTT"
          label="Send to IFFTT"
        />
        <TextInput
          label="API Key"
          settingsKey="apiKey"
        />
        </Section>
      <Section
        title={<Text bold>Adafruit IO Settings</Text>}>
        <Toggle
          settingsKey="toggleAIO"
          label="Send to Adafruit IO"
        />
        <TextInput
          label="AIO User"
          settingsKey="aioUser"
        />
        <TextInput
          label="AIO Key"
          settingsKey="aioKey"
        />
        <TextInput
          label="Feed Name"
          settingsKey="aioFeed"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);