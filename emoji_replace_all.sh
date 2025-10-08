#!/bin/bash

# Comprehensive emoji replacement script for all remaining files
cd /workspaces/mh-website

# Define emoji to Material Icon mappings
declare -A emoji_map=(
    ["🎯"]="[GPS_FIXED]"
    ["🚀"]="[ROCKET_LAUNCH]"
    ["💡"]="[LIGHTBULB]"
    ["🔒"]="[LOCK]"
    ["🌟"]="[STAR_RATE]"
    ["⚡"]="[BOLT]"
    ["✨"]="[AUTO_AWESOME]"
    ["🎨"]="[PALETTE]"
    ["📊"]="[ANALYTICS]"
    ["💪"]="[FITNESS_CENTER]"
    ["🏆"]="[EMOJI_EVENTS]"
    ["🔧"]="[BUILD]"
    ["🎖️"]="[MILITARY_TECH]"
    ["⭐"]="[STAR]"
    ["🏅"]="[WORKSPACE_PREMIUM]"
    ["🎓"]="[SCHOOL]"
    ["📈"]="[TRENDING_UP]"
    ["🔥"]="[WHATSHOT]"
    ["💼"]="[WORK]"
    ["🤝"]="[HANDSHAKE]"
    ["👥"]="[GROUPS]"
    ["📱"]="[SMARTPHONE]"
    ["💻"]="[COMPUTER]"
    ["🏠"]="[HOME]"
    ["🏢"]="[APARTMENT]"
    ["🌐"]="[LANGUAGE]"
    ["📞"]="[PHONE]"
    ["✉️"]="[EMAIL]"
    ["📍"]="[LOCATION_ON]"
    ["☀️"]="[WB_SUNNY]"
    ["🌙"]="[DARK_MODE]"
    ["🤖"]="[SMART_TOY]"
    ["📅"]="[EVENT]"
    ["🏗️"]="[CONSTRUCTION]"
    ["🛡️"]="[SECURITY]"
    ["⚙️"]="[ENGINEERING]"
    ["✅"]="[CHECK_CIRCLE]"
    ["➡️"]="[ARROW_FORWARD]"
    ["👁️"]="[VISIBILITY]"
    ["⚠️"]="[WARNING]"
    ["🏛️"]="[ACCOUNT_BALANCE]"
    ["✈️"]="[FLIGHT]"
    ["⚓"]="[ANCHOR]"
    ["🦅"]="[SPA]"
    ["🇺🇸"]="[FLAG]"
    ["🚢"]="[DIRECTIONS_BOAT]"
    ["🔴"]="[ERROR]"
    ["🟡"]="[PRIORITY_HIGH]"
    ["🟢"]="[CHECK_CIRCLE]"
    ["🔵"]="[INFO]"
    ["ℹ️"]="[INFO]"
    ["📡"]="[SIGNAL_CELLULAR_ALT]"
    ["💰"]="[ATTACH_MONEY]"
    ["💵"]="[PAYMENTS]"
    ["💲"]="[MONETIZATION_ON]"
    ["💎"]="[DIAMOND]"
    ["♿"]="[ACCESSIBLE]"
    ["👨‍💼"]="[PERSON]"
    ["📧"]="[EMAIL]"
    ["🚨"]="[EMERGENCY]"
    ["❄️"]="[AC_UNIT]"
    ["🔍"]="[SEARCH]"
    ["⏱️"]="[TIMER]"
    ["⏰"]="[ALARM]"
    ["📝"]="[EDIT_NOTE]"
    ["🔄"]="[REFRESH]"
    ["📋"]="[ASSIGNMENT]"
    ["📦"]="[INVENTORY_2]"
    ["🌡️"]="[THERMOSTAT]"
    ["❓"]="[HELP]"
    ["👨‍⚕️"]="[MEDICAL_SERVICES]"
    ["🎪"]="[CELEBRATION]"
    ["🎭"]="[THEATER_COMEDY]"
    ["🎬"]="[MOVIE]"
    ["🎤"]="[MIC]"
    ["🎸"]="[MUSIC_NOTE]"
    ["🎹"]="[PIANO]"
    ["🎺"]="[MUSIC_NOTE]"
    ["🎻"]="[MUSIC_NOTE]"
    ["🥁"]="[MUSIC_NOTE]"
    ["🎮"]="[SPORTS_ESPORTS]"
    ["🎲"]="[CASINO]"
    ["🎰"]="[CASINO]"
    ["🎳"]="[SPORTS_BASEBALL]"
    ["🎱"]="[SPORTS_BASEBALL]"
    ["🛟"]="[SAFETY_RING]"
    ["🗺️"]="[MAP]"
    ["📸"]="[PHOTO_CAMERA]"
)

# Get all TypeScript and JavaScript files
files=$(find src/ -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx")

echo "Starting comprehensive emoji replacement..."

for file in $files; do
    # Check if file contains emojis
    if grep -q "[🎯🚀💡🔒🌟⚡✨🎨📊💪🏆🔧🎖️⭐🏅🎓📈🔥💼🤝👥📱💻🏠🏢🌐📞✉️📍☀️🌙🤖📅🏗️🛡️⚙️✅➡️👁️⚠️🏛️✈️⚓🦅🇺🇸🚢🔴🟡🟢🔵ℹ️📡💰💵💲💎♿👨‍💼📧🚨❄️🔍📱💻🌐⏱️⏰🎓📝🔄📋📦💼🌡️❓♿👨‍⚕️🎪🎭🎬🎤🎸🎹🎺🎻🥁🎮🎲🎰🎳🎱🛟🗺️📸]" "$file"; then
        echo "Processing: $file"
        
        # Create backup
        cp "$file" "${file}.emoji-backup"
        
        # Apply replacements
        for emoji in "${!emoji_map[@]}"; do
            replacement="${emoji_map[$emoji]}"
            sed -i "s/$emoji/$replacement/g" "$file"
        done
    fi
done

echo "Emoji replacement completed for all files!"
echo "Backups created with .emoji-backup extension"