import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Stopwatch({ isRunning, time, setTime, size, startTime }) {

  useEffect(() => {
    
    let interval;

    if (isRunning && startTime) {
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setTime(elapsed);
      }, 10); // update every 10ms
    } else if (!isRunning) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, startTime, setTime]);
  

  const formatTime = (time) => {
    const ms = ('0' + Math.floor((time % 1000) / 10)).slice(-2);
    const secs = ('0' + Math.floor((time / 1000) % 60)).slice(-2);
    const mins = ('0' + Math.floor(time / 60000)).slice(-2);
    const hrs = ('0' + Math.floor(time / 3600000)).slice(-2);
    if (hrs > 0) {
      return `${hrs}:${mins}:${secs}:${ms}`;
    }
    return `${mins}:${secs}:${ms}`;
  };

    if (size === 'large') {
        return (
            <View>
                <Text style={styles.timeLarge}>{formatTime(time)}</Text>
            </View>
        );
    }
    if (size === 'small') {
        return (
            <View>
                <Text style={styles.timeSmall}>{formatTime(time)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    timeLarge: {
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    timeSmall: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    }
});