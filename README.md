
# React Native Stories View
## Getting Started

A simple and fully customizable React Native components that provides a status/stories feature like Whatsapp, Instagram.
For navigation across all the stories you can touch the left or right portion of the screen for next and previous story. 
The library works seemleslly across both Android as well as IOS platform developed 🔥.


This StoryView component contains following libraries which you have to install in your project -

 [React Native Video](https://www.npmjs.com/package/react-native-video)
 
 [React Native SVG](https://www.npmjs.com/package/react-native-svg)

 [React Native Swipe Gestures](https://www.npmjs.com/package/react-native-swipe-gestures)
 

#### Feature's include :

- Progress bar with custom styling options.
- Story Image view with custom styling options.
- A fully customizable Header View, you can use default one or pass in your choice of component.


## Installation

If using yarn: 

```bash
 yarn add react-native-stories-view
```

If using npm:
```bash
npm i react-native-stories-view
```

#### Basic usage
This simply opens the modal and show content of story. You can handle animation type of modal by this.
Enable/disable story header and custom style progressBar.


```
import StoryContainer from './StoryContainer';
...
const [open, setOpen] = useState({open: false});   // mandatory

// mandatory to given
 const handleOpen = useCallback(
    param => {
      setOpen(param);
    },
    [open],
  );


 return (
      <StoryContainer
        open={open}
        header={true}
        data={vidArr}
        animationType="slide"
        headerLeftIcon={true}
        handleOpen={handleOpen}
        progressViewColor={Colors.red}
        progressViewCompleteColor={Colors.red}
        headerLeftIconStyle={styles.headerLeftIconStyle}
      />
      <FlatList data={vidArr} renderItem={onRender} />
    </SafeAreaView>
  );
```
    
## Props

| Prop                     |  Default   |         Type          | Description                |
| :------------------------| :-------:  | :-------------------: | :------------------------- |
| open                     | `open`     |       {}              | Mandatory to given as open |
| header                   |  `true`   |      `Boolean`        | enable/disable story header|
| data                     |`[{}]`      | -             | Image to display           |
| animationType            |     `slide`|      `string`       | animation types - slide,fade,none    |
| headerLeftIcon           |     `true`     |   `Boolean`                  | profile header left image                |
| handleOpen               |  `handleOpen`   |       `Function`       | Mandatory to given as handleOpen  |
| progressViewColor        |  `red`   |       `string`       | ProgressView custom colour  |
| progressViewCompleteColor|  `red`   |       `string`       | Completed progressView custom color  |
| headerLeftIconStyle      |  -   |       `{}`       | Custom style for header left image  |


#### Another section to add

You have to add it in render item of flatlist. It handles the cardPress open modal function and partitions of story items using svg.

```
 const {username, profile} = item;
    const onPressCard = () => {
      setTimeout(() => {
        setOpen({open: true, index});
      }, 10);
    };

    return (
      <React.Fragment>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.listContainerView}
          onPress={onPressCard}>
          <Svg width="70" height="70" viewBox="0 0 100 100">
            <Circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke={Colors.lightGrey}
              strokeWidth={4}
              strokeDasharray={
                item.stories.length > 1
                  ? `${(48 * 2 * Math.PI) / item.stories.length - 4} 4`
                  : null
              }
            />
            <View style={styles.profileView}>
              <Image source={{uri: profile}} style={styles.profileImage} />
            </View>
          </Svg>
          <Text style={styles.userNameText}>{username}</Text>
        </TouchableOpacity>
        <View style={styles.topSeperatorView} />
      </React.Fragment>
    );
```
$~~~~~~~~~~~~~~$<img width="350" alt="Screenshot 2022-10-11 at 11 14 23 AM" src="https://user-images.githubusercontent.com/103026925/195006541-b268fb5c-ab2b-40c6-9299-cb98dbead267.png">$~~~~~~~~~~~~~~~~~~~~~~~~~~$<img width="350" alt="Screenshot 2022-10-11 at 11 14 19 AM" src="https://user-images.githubusercontent.com/103026925/195006545-8a357b76-5fd6-4cd4-9180-da4b4eb7b426.png">
