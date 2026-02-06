#!/bin/bash

# EPOCH SKIN AUTO-UPDATE SCRIPT
# This script automatically updates your Epoch Skin website

echo "🚀 EPOCH SKIN AUTO-UPDATE SCRIPT"
echo "=================================="
echo ""

# Color codes for pretty output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the epoch-skin directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Not in epoch-skin directory${NC}"
    echo "Please run this script from inside your epoch-skin folder"
    echo "Example: cd ~/Desktop/epoch-skin && bash update.sh"
    exit 1
fi

echo -e "${BLUE}📂 Found epoch-skin project${NC}"
echo ""

# Step 1: Create backup
echo -e "${YELLOW}Step 1: Creating backup...${NC}"
cd ..
if [ -d "epoch-skin-BACKUP" ]; then
    echo "Backup already exists, skipping..."
else
    cp -r epoch-skin epoch-skin-BACKUP
    echo -e "${GREEN}✅ Backup created: epoch-skin-BACKUP${NC}"
fi
cd epoch-skin
echo ""

# Step 2: Check if update files exist
echo -e "${YELLOW}Step 2: Looking for update files...${NC}"
UPDATE_PATH=""

# Check common locations
if [ -d "$HOME/Downloads/epoch-skin-updates" ]; then
    UPDATE_PATH="$HOME/Downloads/epoch-skin-updates"
elif [ -d "../epoch-skin-updates" ]; then
    UPDATE_PATH="../epoch-skin-updates"
elif [ -d "epoch-skin-updates" ]; then
    UPDATE_PATH="epoch-skin-updates"
fi

if [ -z "$UPDATE_PATH" ]; then
    echo -e "${RED}❌ Cannot find epoch-skin-updates folder${NC}"
    echo "Please make sure you've extracted epoch-skin-updates.zip"
    echo "Expected location: ~/Downloads/epoch-skin-updates"
    exit 1
fi

echo -e "${GREEN}✅ Found update files at: $UPDATE_PATH${NC}"
echo ""

# Step 3: Copy data files
echo -e "${YELLOW}Step 3: Updating data files...${NC}"
cp "$UPDATE_PATH/data/products.ts" data/products.ts
echo -e "${GREEN}✅ Updated data/products.ts${NC}"
cp "$UPDATE_PATH/data/services.ts" data/services.ts
echo -e "${GREEN}✅ Updated data/services.ts${NC}"
echo ""

# Step 4: Copy new component files
echo -e "${YELLOW}Step 4: Adding new components...${NC}"
cp "$UPDATE_PATH/components/home/About.tsx" components/home/About.tsx
echo -e "${GREEN}✅ Created components/home/About.tsx${NC}"
cp "$UPDATE_PATH/components/home/Commitment.tsx" components/home/Commitment.tsx
echo -e "${GREEN}✅ Created components/home/Commitment.tsx${NC}"
cp "$UPDATE_PATH/components/home/FAQ.tsx" components/home/FAQ.tsx
echo -e "${GREEN}✅ Created components/home/FAQ.tsx${NC}"
cp "$UPDATE_PATH/components/home/Contact.tsx" components/home/Contact.tsx
echo -e "${GREEN}✅ Created components/home/Contact.tsx${NC}"
echo ""

# Step 5: Update Hero component text
echo -e "${YELLOW}Step 5: Updating Hero text (Natural → Organic)...${NC}"
if [ -f "components/home/Hero.tsx" ]; then
    sed -i '' 's/Natural Beauty, Timeless Results/Organic Beauty, Timeless Results/g' components/home/Hero.tsx
    sed -i '' 's/100% Natural Ingredients/100% Organic Ingredients/g' components/home/Hero.tsx
    sed -i '' 's/natural skincare/organic skincare/g' components/home/Hero.tsx
    sed -i '' 's/Natural skincare/Organic skincare/g' components/home/Hero.tsx
    sed -i '' 's/botanical/organic/g' components/home/Hero.tsx
    sed -i '' 's/Botanical/Organic/g' components/home/Hero.tsx
    echo -e "${GREEN}✅ Updated Hero.tsx text${NC}"
else
    echo -e "${YELLOW}⚠️  Hero.tsx not found, skipping...${NC}"
fi
echo ""

# Step 6: Update other text globally
echo -e "${YELLOW}Step 6: Global text replacements...${NC}"
# Find all .tsx and .ts files and replace text
find components app -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/natural ingredients/organic ingredients/g' {} +
find components app -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/Natural ingredients/Organic ingredients/g' {} +
find components app -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/botanical skincare/organic skincare/g' {} +
find components app -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/Our Natural Skincare/Our Organic Skincare/g' {} +
echo -e "${GREEN}✅ Global text replacements complete${NC}"
echo ""

# Step 7: Manual step for app/page.tsx
echo -e "${YELLOW}Step 7: app/page.tsx needs manual update${NC}"
echo ""
echo -e "${BLUE}📝 IMPORTANT: You need to edit app/page.tsx manually:${NC}"
echo ""
echo "1. Open the file:"
echo "   nano app/page.tsx"
echo ""
echo "2. Add these imports at the top:"
echo "   import About from \"@/components/home/About\";"
echo "   import Commitment from \"@/components/home/Commitment\";"
echo "   import FAQ from \"@/components/home/FAQ\";"
echo "   import Contact from \"@/components/home/Contact\";"
echo ""
echo "3. Remove this line if it exists:"
echo "   import Testimonials from \"@/components/home/Testimonials\";"
echo ""
echo "4. In the return section, remove:"
echo "   <Testimonials />"
echo ""
echo "5. Add these components in order:"
echo "   <About />"
echo "   <Commitment />"
echo "   <FAQ />"
echo "   <Contact />"
echo ""
echo "6. Save with: Ctrl+X, then Y, then Enter"
echo ""

# Ask user if they want to open the file now
read -p "Would you like to open app/page.tsx now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    nano app/page.tsx
fi

echo ""
echo -e "${GREEN}✅ ✅ ✅ UPDATE COMPLETE! ✅ ✅ ✅${NC}"
echo ""
echo -e "${BLUE}📋 SUMMARY:${NC}"
echo "✅ Backup created"
echo "✅ Data files replaced (products & services)"
echo "✅ New components added (About, Commitment, FAQ, Contact)"
echo "✅ Text updated (Natural → Organic)"
echo "✅ Hero component updated"
echo ""
echo -e "${BLUE}🧪 NEXT STEPS:${NC}"
echo ""
echo "1. If you haven't edited app/page.tsx yet, do that now:"
echo "   nano app/page.tsx"
echo ""
echo "2. Start the dev server:"
echo "   npm run dev"
echo ""
echo "3. Open browser:"
echo "   http://localhost:3000"
echo ""
echo "4. Check that everything looks good!"
echo ""
echo -e "${GREEN}🎉 You're all set!${NC}"
