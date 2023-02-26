import {
  Box,
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  TabIndicator,
  Button,
  Accordion,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Text,
  Select,
  Input,
  FormLabel,
  Tooltip,
  Flex,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";
import { Formik, Field, useField, ErrorMessage } from "formik";
import MultiSelect from "react-select";

function WaypointRow({
  longitude = 0,
  latitude = 0,
  type = "waypoint",
  updateState,
}) {
  return (
    <Box pb={4}>
      <Tooltip label="longitudinal position of the marker in degrees">
        <Input
          value={longitude}
          onChange={(event) => updateState({ longitude: event.target.value })}
        ></Input>
      </Tooltip>
      <Tooltip label="latitude position of the marker in degrees">
        <Input
          value={latitude}
          onChange={(event) => updateState({ latitude: event.target.value })}
        ></Input>
      </Tooltip>
      <Tooltip label="Waypoints are markers that the ship must pass through, gates are markers that">
        <Select
          value={type}
          onChange={(event) => updateState({ type: event.target.value })}
        >
          <option value="waypoint">Waypoint</option>
          <option value="gate">Gate</option>
        </Select>
      </Tooltip>
    </Box>
  );
}

const WaypointsForm = ({ title = "Markers" }) => {
  const [state, setState] = useState({
    waypoints: [
      {
        longitude: 1,
        latitude: 2,
        type: "waypoint",
      },
      {
        longitude: 3,
        latitude: 4,
        type: "waypoint",
      },
    ],
  });

  const updateWaypoint = (i, waypoint) => {
    const oldWaypoints = state.waypoints;
    oldWaypoints[i] = { ...oldWaypoints[i], ...waypoint };
    setState({ waypoints: oldWaypoints });
  };

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {state.waypoints.map((waypoint, i) => (
          <WaypointRow
            longitude={waypoint.longitude}
            latitude={waypoint.latitude}
            type={waypoint.type}
            updateState={(waypoint) => updateWaypoint(i, waypoint)}
          />
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
};

function SettingsForm({ title = "Settings" }) {
  const [sliderValue, setSliderValue] = useState([0, 14]);

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Input placeHolder="Hire cost" />
        <Tooltip label="Minimum and maximum speeds, in knots.">
          <RangeSlider
            min={0}
            max={14}
            step={0.5}
            onChange={(val) => setSliderValue(val)}
          >
            <RangeSliderMark
              value={sliderValue}
              textAlign="center"
              bg="blue.500"
              color="white"
              mt="-10"
              ml="-5"
              w="12"
            >
              {sliderValue[0]} - {sliderValue[1]}
            </RangeSliderMark>
            <RangeSliderTrack bg="blue.200">
              <Box position="relative" right={10} />
              <RangeSliderFilledTrack bg="blueviolet" />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </Tooltip>
      </AccordionPanel>
    </AccordionItem>
  );
}

function CreateAccordion() {
  return (
    <Accordion>
      <WaypointsForm />
      <SettingsForm />
      <Button mt={4} colorScheme="teal" type="submit">
        Submit
      </Button>
    </Accordion>
  );
}

const iceCreamOptions = [
  { value: "speed", label: "Speed" },
  { value: "tws", label: "TWS" },
  { value: "twa", label: "TWA" },
];

const FormSelect = ({ name, options, isMulti }) => {
  const [field, meta, helpers] = useField(name);

  function handleChange(option) {
    if (!isMulti) {
      helpers.setValue(option.value);
    } else {
      helpers.setFieldValue(option ? option.map((item) => item.value) : []);
    }
  }

  return (
    <MultiSelect
      name={name}
      onChange={(value) => {
        helpers.setValue(value.map((item) => item.value));
      }}
      options={options}
      onBlur={() => helpers.setTouched(true)}
      isMulti={isMulti}
    />
  );
};

function ExampleForm() {
  return (
    <Formik
      initialValues={{
        polarName: 1234,
        polarCondition: "",
        icecream: null,
      }}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        setTimeout(() => setSubmitting(false), 1000);
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="polarName">Polar Name</FormLabel>
            <Field as={Input} id="polarName" name="polarName" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="polarCondition">Loading Condition</FormLabel>
            <Field as={Input} id="polarCondition" name="polarCondition" />
          </FormControl>
          <FormControl>
            <FormSelect name="icecream" options={iceCreamOptions} isMulti />
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default function ControlPlane() {
  return (
    <Box
      height="100vh"
      w="60ch"
      maxW="container.lg"
      backgroundColor={"white"}
      boxSizing="border-box"
      boxShadow="xl"
    >
      <Tabs isFitted>
        <TabList>
          <Tab>Create</Tab>
          <Tab>Polar</Tab>
          <Tab>Chat</Tab>
        </TabList>
        <TabIndicator mt="-36px" zIndex={-1} height="34px" bg="green.200" />
        <TabPanels>
          <TabPanel p={0}>
            <CreateAccordion />
          </TabPanel>
          <TabPanel>
            <ExampleForm />
          </TabPanel>
          <TabPanel>Chat</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
