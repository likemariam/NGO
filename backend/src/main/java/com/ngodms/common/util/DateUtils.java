package com.ngodms.common.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateUtils {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private DateUtils() {}

    public static String format(LocalDateTime dateTime) {
        if (dateTime == null) return null;
        return dateTime.format(FORMATTER);
    }

    public static LocalDateTime now() {
        return LocalDateTime.now();
    }
}
